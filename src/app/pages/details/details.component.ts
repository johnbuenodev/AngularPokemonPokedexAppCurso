import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public isLoading: boolean = false;
  public loadingError: boolean = false;

  public pokemonDetails: any;
  private urlPokemonInformations: string = "https://pokeapi.co/api/v2/pokemon";
  private urlSpecie: string = "https://pokeapi.co/api/v2/pokemon-species";

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.pokemon();
  }

  public pokemon() {

    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemonsDetails(`${this.urlPokemonInformations}/${id}`); 
    const name = this.pokeApiService.apiGetPokemonsDetails(`${this.urlSpecie}/${id}`);     
    
    //join 
    return forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemonDetails = res;
        //console.log(res);
        //Quando tiver carregado vai dar TRUE no isLoading
        this.isLoading = true;
        this.loadingError = false;
      },
      err => {
        this.loadingError = true;
      }
    )
    
    //return console.log(pokemon);
  }

}

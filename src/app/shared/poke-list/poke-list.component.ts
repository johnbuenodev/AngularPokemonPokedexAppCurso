import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {

  public getAllPokemons: any;
  public setAllPokemonsOrigin: any;

  public isLoading: boolean = false;
  public loadingError: boolean = false;

  @Input() valueSearchList: string = "";

  constructor(
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      //res => console.log(res),
      res => { 
        this.setAllPokemonsOrigin = res.results,
        this.getAllPokemons = this.setAllPokemonsOrigin, //recebendo somente os resultas dos pokemons
        this.isLoading = true
      }, 
      err => this.loadingError = true
      //console.log("Ocorreu o erro: " + err)
    );

    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.valueSearchList.currentValue != "") {
      //console.log("Tem valor!")
      const filter = this.setAllPokemonsOrigin.filter((res: any) => {
        //verificar se as primeiras letras do pokemon  
        return !res.name.indexOf(this.valueSearchList.toLowerCase());
      })
      this.getAllPokemons = filter;
    }
    
    if (changes.valueSearchList.currentValue == "") {
      this.getAllPokemons = this.setAllPokemonsOrigin;
    }
    
  }

}

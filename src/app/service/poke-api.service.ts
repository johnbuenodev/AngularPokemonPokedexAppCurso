import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Observable
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url : string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';

  constructor(
    private httpClient:HttpClient
  ) { }


  get apiListAllPokemons():Observable <any> {
    //pipe como um tuBo(Uma conexão que dentro pode fazer outros passos) aonde pode fazer outras ações processar outras informações
   return this.httpClient.get<any>(this.url).pipe(
     //função tap do rxjs
     tap(res => res),
     tap(res => {
      ///console.log(res);
      ///map do javascript
      ///acessando sem Tipagem usando any
      res.results.map( (resPokemon: any) => {
        
        this.apiGetPokemonsDetails(resPokemon.url).subscribe(
          res => resPokemon.informationsPokemon = res,
          err => console.log("Ocorre o erro: " + err)
        )
        /*   Forma inicial mas vai ser descentralizado chamando uma outra função
          this.httpClient.get<any>(resPokemons.url).pipe(
            map(
              //vai trazer o res  //response com os dados no nivel que apresenta dentro da url do registro no backend
              res => res
            )
          ).subscribe(
            //vai pegar o response res filtrado no map e vai passar para o resPokemons
            res => resPokemons.status = res
          ) */

        })
     })
   );
  }

  ///Bem mais facil de entender o processo!! vai acessar cada resgistro fazendo as
  ///chamadas buscando os dados de cada pokemon retornar
  //E empacotar com cada registro dentro do pokemon.results para cada registro json
  public apiGetPokemonsDetails(url: string): Observable<any> {
    
    return this.httpClient.get<any>(url).pipe(
      map(
        res => res
      )
    )
  }
}

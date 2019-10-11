import { Grafica } from "./grafica";

export class GraficaData {

    public grafica: Grafica[] = [];

    private tipo: string;
    private label: string;
    private eje: string[] = [];
    private valores: number[] = [0, 0, 0, 0];

    constructor() { 


      
        this.tipo = 'linechart';
        this.label = 'Ventas';
        this.eje = ['enero', 'febrero', 'marzo', 'abril'];
        this.valores = [0, 0, 0, 0];
        var payload = {
            tipo: this.tipo,
            label: this.label,
            eje: this.eje,
            valores: this.valores
        }
        this.agregarGrafica(payload);

        this.tipo = 'barchart';
        this.label = 'Preguntas';
        this.eje = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'];
        this.valores = [0, 0, 0, 0];
        payload = {
            tipo: this.tipo,
            valores: this.valores,
            label: this.label,
            eje: this.eje
        }
        this.agregarGrafica(payload);


    }

    agregarGrafica(grafica: Grafica) {

        this.grafica.push(grafica);
        //console.log(this.grafica);
        
        
    }

    getDataGrafica(tipo:string ='linechart') {


        for(let grafica of this.grafica){
            if( grafica.tipo === tipo) {
                console.log('este es', grafica);
                return grafica;
            }
        }
        
        
    } //fin

    incrementarValor( eje: string, valor: number, tipo: string) {
        /*
        eje = eje.toLocaleLowerCase().trim();
        for( let i in this.meses) {
            if( this.meses[i] === mes){
                this.valores[i] += valor;
            }
        }*/


        for(let grafica of this.grafica){
            if( grafica.tipo === tipo) {
                for( let i in grafica.eje) {
                    if( grafica.eje[i] === eje){
                        grafica.valores[i] += valor;
                    }
                }
                return this.getDataGrafica(tipo);
            }
        }

        //return this.getDataGrafica();
    } //fin

}

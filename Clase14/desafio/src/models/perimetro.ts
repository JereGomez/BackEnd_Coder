export default class Perimetro{
    static cuadrado(lado: number){
        return lado * 4;
    };

    static rectangulo(base: number, alto: number){
        return alto*2 + base*2;
    };

    static ciruclo(radio: number){
        return 2 * Math.PI * radio;
    };
}
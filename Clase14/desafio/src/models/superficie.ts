export default class Superficie{
    static cuadrado(lado: number){
        return lado*lado;
    };

    static rectangulo(base: number, alto: number){
        return alto*base;
    };

    static ciruclo(radio: number){
        return Math.PI * radio * radio;
    };
}
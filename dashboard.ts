
/**
* Utilisez ce fichier pour définir des fonctions et des blocs personnalisés.
* En savoir plus à https://makecode.microbit.org/blocks/custom
*/

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace dashboard {
    export function send_dashboard(radio_grp: number, ledState: number, lum: number, motionDetected: number, humanDetected: number) {
        radio.setGroup(radio_grp)
        radio.sendString(`${ledState}, ${lum}, ${motionDetected}, ${humanDetected}`)
        
        basic.pause(1000)
    }
}

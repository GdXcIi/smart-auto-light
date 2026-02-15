/**
 * === MAIN LOGIC ===
 */
// === UTILS ===
function switchOnLEDs () {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(30000)
}
function switchOffLEDs () {
    basic.clearScreen()
}
function checkIR () {
    return pins.digitalReadPin(IR_PIN) == 1
}
function checkLum () {
    return input.lightLevel() < LUMINOSITY_THRESHOLD
}
function checkPIR () {
    return pins.digitalReadPin(PIR_PIN) == 1
}
function isButtonAPressed () {
    // Corrigé : Button.A directement
    return input.buttonIsPressed(Button.A)
}
let IR_PIN = 0
let PIR_PIN = 0
let LUMINOSITY_THRESHOLD = 0
// === CONFIG ===
LUMINOSITY_THRESHOLD = 50
PIR_PIN = DigitalPin.P0
IR_PIN = DigitalPin.P1
// Plus propre que de déclarer une fonction anonyme
basic.forever(function () {
    // Priorité au bouton A (override les capteurs)
    // Sinon, vérifier les capteurs
    if (isButtonAPressed()) {
        switchOnLEDs()
    } else if (checkPIR() && checkIR() && checkLum()) {
        switchOnLEDs()
    } else {
        switchOffLEDs()
    }
    let ledState = isButtonAPressed() || checkPIR() && checkIR() && checkLum() ? 1 : 0
dashboard.send_dashboard(1, ledState, input.lightLevel(), checkPIR() ? 1 : 0, checkIR() ? 1 : 0)
})

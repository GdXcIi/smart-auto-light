// === CONFIG ===
const LUMINOSITY_THRESHOLD = 50
const PIR_PIN = DigitalPin.P0
const IR_PIN = DigitalPin.P1

// === UTILS ===
function switchOnLEDs() {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
    `)
    basic.pause(100)
}

function switchOffLEDs() {
    basic.clearScreen()
}

function checkIR(): boolean {
    return pins.digitalReadPin(IR_PIN) == 1
}

function checkLum(): boolean {
    return input.lightLevel() < LUMINOSITY_THRESHOLD
}

function checkPIR(): boolean {
    return pins.digitalReadPin(PIR_PIN) == 1
}

function isButtonAPressed(): boolean {
    return input.buttonIsPressed(Button.A)  // Corrigé : Button.A directement
}

// === MAIN LOGIC ===
function main() {
    // Priorité au bouton A (override les capteurs)
    if (isButtonAPressed()) {
        switchOnLEDs()
    }
    // Sinon, vérifier les capteurs
    else if (checkPIR() && checkIR() && checkLum()) {
        switchOnLEDs()
    } else {
        switchOffLEDs()
    }

    // Mise à jour du dashboard (à appeller APRES les checks)
    const ledState = (isButtonAPressed() || (checkPIR() && checkIR() && checkLum())) ? 1 : 0
    dashboard.send_dashboard(
        1,  // radio_grp
        ledState,
        input.lightLevel(),
        checkPIR() ? 1 : 0,
        checkIR() ? 1 : 0
    )
}

// === BOUCLE PRINCIPALE ===
basic.forever(main)  // Plus propre que de déclarer une fonction anonyme

# === UTILS ===
def switchOnLEDs():
    basic.show_leds("""
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        """)
    basic.pause(30000)
def switchOffLEDs():
    basic.clear_screen()
def checkIR():
    return pins.digital_read_pin(IR_PIN) == 1
def checkLum():
    return input.light_level() < LUMINOSITY_THRESHOLD
def checkPIR():
    return pins.digital_read_pin(PIR_PIN) == 1
def isButtonAPressed():
    # Corrigé : Button.A directement
    return input.button_is_pressed(Button.A)
# === MAIN LOGIC ===
def main():
    # Priorité au bouton A (override les capteurs)
    # Sinon, vérifier les capteurs
    if isButtonAPressed():
        switchOnLEDs()
    elif checkPIR() and checkIR() and checkLum():
        switchOnLEDs()
    else:
        switchOffLEDs()
    ledState = 1 if (isButtonAPressed() or (checkPIR() and checkIR() and checkLum())) else 0
    # radio_grp
    dashboard.send_dashboard(1,
        ledState,
        input.light_level(),
        1 if checkPIR() else 0,
        1 if checkIR() else 0)
IR_PIN = 0
PIR_PIN = 0
LUMINOSITY_THRESHOLD = 0
# === CONFIG ===
LUMINOSITY_THRESHOLD = 50
PIR_PIN = DigitalPin.P0
IR_PIN = DigitalPin.P1
# Plus propre que de déclarer une fonction anonyme
basic.forever(main)
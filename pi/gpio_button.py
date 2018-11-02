from gpiozero import Button
from ping_pong_button import PingPongButton
from signal import pause
import httplib

print("Waiting for buttons to be pressed...")

blue_player = PingPongButton(20)
red_player = PingPongButton(21)
reset_btn = Button(12)

def send_request(endpoint):
    print("Sending HTTP request [%s]" % ("summer-partridge.glitch.me" + endpoint))
    conn = httplib.HTTPConnection("summer-partridge.glitch.me")
    conn.request("POST", endpoint)
    res = conn.getresponse()
    print("HTTP response", res.status, res.reason)

def button_released(btn, player):
    if not btn.on_hold:
        print("Click", player)
        send_request("/score/" + player)
    else:
        btn.on_hold = False

def button_hold(btn, player):
    print("Hold", player)
    btn.on_hold = True
    send_request("/undo/" + player)

def reset():
    print("Reset")
    send_request("/reset")

blue_player.when_released = lambda : button_released(blue_player, "blue")
blue_player.when_held = lambda : button_hold(blue_player, "blue")
red_player.when_released = lambda : button_released(red_player, "red")
red_player.when_held = lambda : button_hold(red_player, "red")
reset_btn.when_pressed = lambda : reset()

pause()

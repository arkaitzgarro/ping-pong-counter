from gpiozero import Button

class PingPongButton(Button):
    def __init__(self, *args, **kwarg):
        super(PingPongButton, self).__init__(*args, **kwarg)
        self.on_hold = False

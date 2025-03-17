import random
class Die:
    def __init__(self, sides = 6):
        self.sides = sides

    def roll_die(self):
        return random.randint(1, self.sides)
    
die = Die(12)
for i in range(10):
    print(die.roll_die())

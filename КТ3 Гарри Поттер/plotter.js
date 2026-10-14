"use strict";
class LogToConsole {
    log(message) {
        console.log(message);
    }
}
class Plotter {
    logger;
    position = { x: 0, y: 0 };
    angle = 0;
    color = "Black";
    isCarriageDown = false;
    constructor(logger) {
        this.logger = logger;
    }
    move(distance) {
        const radians = this.angle * (Math.PI / 180);
        const newPosition = {
            x: Math.round(this.position.x + distance * Math.cos(radians)),
            y: Math.round(this.position.y + distance * Math.sin(radians)),
        };
        if (this.isCarriageDown) {
            this.logger.log(`...Чертим линию из (${this.position.x}, ${this.position.y}) в ` +
                `(${newPosition.x}, ${newPosition.y}) используя ${this.getColorName()} цвет.`);
        }
        else {
            this.logger.log(`Передвигаем на ${distance} от точки (${this.position.x}, ${this.position.y})`);
        }
        this.position = newPosition;
    }
    turn(angle) {
        this.logger.log(`Поворачиваем на ${angle} градусов`);
        this.angle = ((this.angle + angle) % 360 + 360) % 360;
    }
    carriageUp() {
        this.logger.log("Поднимаем каретку");
        this.isCarriageDown = false;
    }
    carriageDown() {
        this.logger.log("Опускаем каретку");
        this.isCarriageDown = true;
    }
    setColor(color) {
        this.color = color;
        this.logger.log(`Устанавливаем ${this.getColorName()} цвет линии.`);
    }
    setPosition(position) {
        this.position = { ...position };
        this.logger.log(`Устанавливаем позицию каретки в (${position.x}, ${position.y}).`);
    }
    getColorName() {
        switch (this.color) {
            case "Black":
                return "чёрный";
            case "Red":
                return "красный";
            case "Green":
                return "зелёный";
        }
    }
}
function drawTriangle(plt, size) {
    plt.setColor("Green");
    for (let i = 0; i < 3; ++i) {
        plt.carriageDown();
        plt.move(size);
        plt.carriageUp();
        plt.turn(120);
    }
}
const plotter = new Plotter(new LogToConsole());
drawTriangle(plotter, 100);

type Point = number;
type Distance = number;
type Angle = number;
type Position = { x: Point; y: Point };
type LineColor = "Black" | "Red" | "Green";

interface Logger {
  log(message: string): void;
}

class LogToConsole implements Logger {
  log(message: string): void {
    console.log(message);
  }
}

class Plotter {
  private position: Position = { x: 0, y: 0 };
  private angle: Angle = 0;
  private color: LineColor = "Black";
  private isCarriageDown = false;

  constructor(private logger: Logger) {}

  move(distance: Distance): void {
    const radians = this.angle * (Math.PI / 180);
    const newPosition: Position = {
      x: Math.round(this.position.x + distance * Math.cos(radians)),
      y: Math.round(this.position.y + distance * Math.sin(radians)),
    };

    if (this.isCarriageDown) {
      this.logger.log(
        `...Чертим линию из (${this.position.x}, ${this.position.y}) в ` +
        `(${newPosition.x}, ${newPosition.y}) используя ${this.getColorName()} цвет.`
      );
    } else {
      this.logger.log(
        `Передвигаем на ${distance} от точки (${this.position.x}, ${this.position.y})`
      );
    }

    this.position = newPosition;
  }

  turn(angle: Angle): void {
    this.logger.log(`Поворачиваем на ${angle} градусов`);
    this.angle = ((this.angle + angle) % 360 + 360) % 360;
  }

  carriageUp(): void {
    this.logger.log("Поднимаем каретку");
    this.isCarriageDown = false;
  }

  carriageDown(): void {
    this.logger.log("Опускаем каретку");
    this.isCarriageDown = true;
  }

  setColor(color: LineColor): void {
    this.color = color;
    this.logger.log(`Устанавливаем ${this.getColorName()} цвет линии.`);
  }

  setPosition(position: Position): void {
    this.position = { ...position };
    this.logger.log(
      `Устанавливаем позицию каретки в (${position.x}, ${position.y}).`
    );
  }

  private getColorName(): string {
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

function drawTriangle(plt: Plotter, size: Distance): void {
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

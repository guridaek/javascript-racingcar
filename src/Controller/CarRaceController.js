const InputView = require('../View/InputView');
const OutputView = require('../View/OutputView');
const CONSTANTS = require('../Constant/Constants');
const Car = require('../Models/Car');
const CarRace = require('../Models/CarRace');
const Console = require('../Utils/Console');
const CarRaceValidator = require('../Models/CarRaceValidator');

class CarRaceController {
  #carRace;

  start() {
    this.getCarName();
  }

  getCarName() {
    InputView.readCarName(carNameString => {
      const splitCarName = carNameString.split(CONSTANTS.comma);
      CarRaceValidator.validateNamesOfCars(splitCarName);
      splitCarName.forEach(name => {
        CarRaceValidator.validateCarName(name);
      });
      this.createCar(splitCarName);
    });
  }

  createCar(carNames) {
    const cars = carNames.map(name => new Car(name));
    this.#carRace = new CarRace(cars);
    this.getTryCount();
  }

  getTryCount() {
    InputView.readTryCount(count => {
      CarRaceValidator.validateTryCount(count);
      this.startCarRace(count);
    });
  }

  startCarRace(count) {
    OutputView.printResultMessage();
    Array.from({ length: count }).forEach(() => {
      this.#carRace.runOnce();
      OutputView.printRaceResult(this.#carRace.getResult());
    });

    this.finishCarRace();
  }

  finishCarRace() {
    OutputView.printWinners(this.#carRace.getResult());
    Console.close();
  }
}

module.exports = CarRaceController;

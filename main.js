const carCanvas = document.getElementById('myCanvas')
carCanvas.width = 400;

const networkCanvas = document.getElementById('networkCanvas')
networkCanvas.width = 500;
networkCanvas.height = 500;

const carCtx = carCanvas.getContext('2d');
const networkCtx = networkCanvas.getContext('2d');

const road = new Road(carCanvas.width/2,carCanvas.width * 0.9, 3)

const N = 50;
const cars = generateCars(N);
let bestCar = cars[0];

if(localStorage.getItem('bestBrain')) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain=JSON.parse(localStorage.getItem('bestBrain'));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain, 0.1)
        }        
    }
}

const traffic = [
    new Car(road.getLaneCenter(1), -200, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(1), -300, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(1), -400, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(1), -400, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(1), -400, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(1), -400, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(1), -400, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(1), -400, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(1), -400, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(0), -100, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -100, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -100, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -100, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -100, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -100, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -100, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -100, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(0), -300, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(0), -300, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(3), -300, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -100, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -100, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -700, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(4), -700, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(1), -500, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(1), -700, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -700, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(4), -700, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -700, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(1), -700, 30, 50, 'DUMMY', 4),
    new Car(road.getLaneCenter(2), -700, 30, 50, 'DUMMY', 4),
];

animate()

function save(){
    localStorage.setItem('bestBrain', 
        JSON.stringify(bestCar.brain)
    )
}

function generateCars(N){
    const cars = [];

    for (let i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, 'AI', 7))
    }

    return cars
}

function animate(time){
    traffic.forEach(traffic => {
        traffic.update(road, [])
    })

    cars.forEach(car => car.update(road, traffic))

    bestCar = cars.find(x => {
        return x.y == Math.min(...cars.map(c => c.y))
    })

    carCanvas.height = window.innerHeight
    networkCanvas.height = window.innerHeight

    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height*0.8);

    road.draw(carCtx)

    traffic.forEach(traffic => {
        traffic.draw(carCtx, "red")
    })

    carCtx.globalAlpha=0.2
    
    cars.forEach(car => {
        car.draw(carCtx, "blue");
    })

    carCtx.globalAlpha=1
    bestCar.draw(carCtx, "blue", true);

    carCtx.restore()

    networkCtx.lineDashOffset = -time/50
    Visualizer.drawNetwork(networkCtx, bestCar.brain)
    requestAnimationFrame(animate)
}






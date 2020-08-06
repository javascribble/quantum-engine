export class Engine extends quantum.Component {
    broker = new quantum.EventBroker();
}

quantum.define('quantum-engine', Engine);
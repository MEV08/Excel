import {DomListener} from './DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.prepare();
  }
  // Настраиваем компонент до init
  prepare() {}
  // Возвращает шаблон компонента
  toHTML() {
    return '';
  }
  // уведомление слушателей про события event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }
  // инициализируем компонент и добавлем dom слушатели
  init() {
    this.initDomListeners();
  }
  // удалем компонент + чистка слушателей
  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}

import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    spyOn(service ,  'getTodos')// spy a method in a class 
        .and.callFake(() => { // -->  this function will erase the real implementation
          return Observable.from([[1, 2, 3]])
        });

    component.ngOnInit();

    // expect(component.todos.length).toBeGreaterThan(0);

    expect(component.todos.length).toBe(3);
  });

  it('should set todos property with the items returned from the server', () => {
    let todos = [1, 2, 3];

    spyOn(service ,  'getTodos')// spy a method in a class 
        .and.callFake(() => { // -->  this function will erase the real implementation
          return Observable.from([ todos])
        });

    component.ngOnInit();

    // expect(component.todos.length).toBeGreaterThan(0);

    expect(component.todos).toBe(todos);
  });

   it('should call the server to save the changes when a new todo item is added ', () => {
      let spy = spyOn(service, 'add')
          .and.callFake(t => {
              return Observable.empty();
          });

      component.add();

      expect(spy).toHaveBeenCalled();
   });

   it('should add the new todo return from the server ', () => {
      let todo = { id: 1}; 

      let spy = spyOn(service, 'add')
                .and.returnValue(Observable.from([ todo ]))
          /* .and.callFake(t => {
              return Observable.from([ todo ]);
          }); */

      component.add();

      expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
   });

   it('should set the message property if server returns error when addidg new todo', () => {
      let error = 'error from the server';

      let spy = spyOn(service, 'add')
                .and.returnValue(Observable.throw(error))
          /* .and.callFake(t => {
              return Observable.from([ todo ]);
          }); */

      component.add();

      expect(component.message).toBe(error);
   });

   it('should call the server to delete a todo item if the user confirms', () => {

     let spyWindow =  spyOn(window, 'confirm')
                           .and.returnValue(true);
     let spyService =  spyOn(service, 'delete')
                           .and.returnValue(Observable.empty());

      component.delete(1);

      // expect(spyService).toHaveBeenCalled();
      expect(spyService).toHaveBeenCalledWith(1);
   });

   it('should NOT call the server to delete a todo item if the user cancels', () => {

     let spyWindow =  spyOn(window, 'confirm')
                           .and.returnValue(false);
     let spyService =  spyOn(service, 'delete')
                           .and.returnValue(Observable.empty());

      component.delete(1);

      expect(spyService).not.toHaveBeenCalled();
   });


});
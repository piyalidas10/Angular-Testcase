# Angular 12 Testcase

### API URLs
1. https://reqres.in/
2. https://apipheny.io/free-api/
3. https://gorest.co.in/

### Angular Http Caching using Interceptor and Refresh
https://www.youtube.com/watch?v=y921lgvICnQ
https://netbasal.com/testing-asynchronous-code-in-angular-using-fakeasync-fc777f86ed13

### Components Testacse
1. user

### Directives Testacse
1. Bgcolor change Directive on click
2. Bgcolor change Directive on mouse hover and mouse out

#### 

```
onKeyDown(event){
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if(event.ctrlKey && charCode === 's'){
      //other actions
      event.preventDefault();
    }
  }
```

Unit testcase
```
describe('Testing tests', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call preventDefault is Ctrl-S is pressed', () => {
    const eventInit: KeyboardEventInit = {
      key: 'S',
      ctrlKey: true
    };
    eventInit['keyCode'] = 83;

    const event = new KeyboardEvent('keydown', eventInit);

    const preventDefaultSpy = spyOn(event, 'preventDefault').and.stub();
    component.onKeyDown(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should NOT call preventDefault is just S is pressed', () => {
    const eventInit: KeyboardEventInit = {
      key: 'S'
    };
    eventInit['keyCode'] = 83;

    const event = new KeyboardEvent('keydown', eventInit);

    const preventDefaultSpy = spyOn(event, 'preventDefault').and.stub();
    component.onKeyDown(event);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
});
```


### Pipes Testacse
1. truncate

### Services Testacse
1. api
2. api-testbed
3. calculator
4. logger


https://testing-angular.com/testing-components-depending-on-services/
https://codehandbook.org/mock-using-spyon-angular-karma/
[Part 18 - SpyOn to mock and Stub methods in angular unit test | Angular unit test case Tutorials](https://www.youtube.com/watch?v=w5UPMIEmTUg)



https://github.com/angular/angular/blob/main/aio/content/examples/testing/src/app/model/hero.service.spec.ts

https://braydoncoyer.dev/blog/how-to-unit-test-an-http-service-in-angular
https://www.dotnetcurry.com/angularjs/unit-testing-angular-services


https://www.scaler.com/topics/angular/angular-interceptor/
https://javascript.plainenglish.io/angular-handle-http-errors-using-interceptors-5cc483103740

https://www.youtube.com/watch?v=YJ4dgoHEmGs
https://armno.medium.com/til-mocking-localstorage-and-sessionstorage-in-angular-unit-tests-a765abdc9d87

https://github.com/Marisha-tech/AngularBlogTest





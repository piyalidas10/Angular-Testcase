import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeType } from 'src/app/models/safe-type';
import { SanitizePipe } from './sanitize.pipe';

describe('SanitizePipe', () => {
  let pipe: SanitizePipe;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SanitizePipe],
      providers: [
        SanitizePipe, 
        {
          /*
            the useValue is important here. 
            If you only provide a value here then its fine. 
            If you want to replace that with a full mocked class you must useClass
          */
          provide: DomSanitizer,
          useValue: {
            sanitize: (val: string) => val,
            bypassSecurityTrustHtml: (val: string) => val,
            bypassSecurityTrustStyle: (val: string) => val,
            bypassSecurityTrustScript: (val: string) => val,
            bypassSecurityTrustUrl: (val: string) => val,
            bypassSecurityTrustResourceUrl: (val: string) => val,
          }
        }
      ]
    })
    pipe = TestBed.inject(SanitizePipe);
  });
  it('transform html', () => {
    const htmlElm = `<iframe class="w-100" src="https://www.youtube.com/embed/KS76EghdCcY?rel=0&amp;controls=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    const str = pipe.transform(htmlElm, SafeType.HTML);
    expect(str).toEqual(htmlElm);
  });
  it('transform resourceUrl', () => {
    const str = pipe.transform(`https://www.w3schools.com/html/mov_bbb.mp4`, SafeType.RESOURCEURL);
    expect(str).toEqual(`https://www.w3schools.com/html/mov_bbb.mp4`);
  });
  it('transform url', () => {
    const str = pipe.transform(`https://www.w3schools.com/html/mov_bbb.mp4`, SafeType.URL);
    expect(str).toEqual(`https://www.w3schools.com/html/mov_bbb.mp4`);
  });
  it('transform style', () => {
    const str = pipe.transform(`background-color:red`, SafeType.STYLE);
    expect(str).toEqual(`background-color:red`);
  });
  it('transform script', () => {
    const str = pipe.transform(`<script>$(function(){alert("hi")})</script>`, SafeType.SCRIPT);
    expect(str).toEqual(`<script>$(function(){alert("hi")})</script>`);
  });
  // it('transform default', () => {
  //   const str = pipe.transform(`<script>$(function(){alert("hi")})</script>`, SafeType.DEFAULT);
  //   expect(str).toThrow(new Error(`Invalid safe type specified`));
  // });
});

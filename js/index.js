import "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js";
import "https://cdnjs.cloudflare.com/ajax/libs/marked/1.1.1/marked.js";
import "https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js";
import aPages from "../pages/index.js";

class Page {
    render(){
        console.log("render called on page");
    }
}

class Section extends Page{
    constructor(oOptions){
        super();
        this.oOptions = oOptions;
    }
    render(){
        $.get(`/pages/${this.oOptions.fname}`, (sMarkdown)=>{
            $(`#${this.oOptions.title}`).html(
                marked(sMarkdown)
            )
    
        })
    }
}

class Article extends Page{
    render(){
        $("article").append(
            `         
<div class="box" id="About">
  <div class="container text-center">
    <h1>About Me</h1> </br>     
    <p>A student of ITD Course of Conestoga College Waterloo.</p></br>
</div>

<div class="container-fluid bg-3 text-center" id="Projects">    
  <h2 style="font-family: 'Times New Roman', Times, serif; color:#1abc9c ;">My Portfolio</h2><br>
  <p style="font-size: large;">I have created websites during the college sessions. They were as follows</p><br><br>
  <div class="row">
    <div class="col-sm-4">
      <a href="#" ><div class="row" style="background-image:url(images/Prototype.png);">
        
      </div></a>
    </div>
    <div class="col-sm-4"> 
      <a href="#" ><div class="row" style="background-image:url(images/Capture2.PNG);">
    </div>
</div><br>
<div class="container-fluid bg-3 text-center">    
  <div class="row">
     <div class="col-sm-4">
      <a href="#" ><div class="row" style="background-image:url(images/Page1.JPG);"></div>
    </div>
      <div class="col-sm-4"> 
      <a href="#" ><div class="row" style="background-image:url(images/Page3.JPG);"></div>
    </div>
    <div class="col-sm-4"> 
      <a href="#" ><div class="row" style="background-image:url(images/Page-3.JPG);">
    </div>
    
  </div>
</div><br><br>
<div class="row" style="background-color: #1abc9c;" id="contact">
  <div class="col-sm-6 col-sm-offset-3">
      <form id="contact-form"  role="form">
          <div class="ajax-hidden">
            <h2>My Contact</h2>
            <p style="font-size: large;">My email is Arana1595@conestogac.on.ca</p>
              <div class="form-group wow fadeInUp">
                  <label class="sr-only" for="c_name">Name</label>
                  <input type="text" id="c_name" class="form-control" name="subject" placeholder="Name">
              </div>
              <div class="form-group wow fadeInUp" data-wow-delay=".1s">
                  <label class="sr-only" for="c_email">Email</label>
                  <input type="email" id="c_email" class="form-control" name="email" placeholder="E-mail">
              </div>
              <div class="form-group wow fadeInUp" data-wow-delay=".2s">
                  <textarea class="form-control" id="c_message" name="message" rows="7" placeholder="Message"></textarea>
              </div>
              <button type="submit" class="btn btn-lg btn-block wow pulse" data-wow-delay=".3s">Send Message</button><br><br>
          </div>
          <div class="ajax-response"></div>
      </form>
  </div>
</div>
          `
        )
    }
}

const sName = "Armaan Rana";

class Footer extends Page{
    render(){
       
        const yToday = new Date().getFullYear();
        $("footer").html(
            `&copy; ${yToday} ${sName}`
        );
    }
}







class Nav extends Page{
    render(){
        let sMenu ="";
        for(let n = 0; n < aPages.length; n++){

            const sMenuItem = aPages[n].title;
            if(sMenuItem != "index")
            {
              sMenu +=  `<li><a href="#${aPages[n].title}">${aPages[n].title}</a></li>`;
            }
        }
        $("nav").html(`
        <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid>
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Portfolio of ${sName}</a>
        </div>
        <div class="navbar-collapse collapse container">
        
            <ul class="nav navbar-nav navbar-right">
            ${sMenu}
            </ul>
        </div>
    </div>
    </nav>
       ` );
    }
}


class Portfolio extends Page{
    constructor(){
        super();
        this.header = new Page();
        this.nav = new Nav();
        this.article = new Article();
        this.footer = new Footer();
    }
    render(){
        this.header.render();
        this.nav.render();
        this.article.render();
        this.footer.render();
    }
}

$(document).ready(()=>{
    new Portfolio().render();
});
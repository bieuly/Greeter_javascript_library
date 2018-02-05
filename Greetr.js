(function(global, $){
    
    var Greetr = function(firstname, lastname, language){
        
        return new Greetr.init(firstname, lastname, language);
    }
    
    // Thanks to closures, all objects/functions written in the Greetr.prototype will have access to these variables. Because the lexical envrionment of those objects/functions is all within this giant IIFE.
    var supportedLangs = ['en', 'es'];
    
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };
    
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    };
    
    // This is where we will put all of our feature of our library
    Greetr.prototype = {
        // We put our features here to save memory. Because each Greetr object will point to this as it's __proto__
        
        fullName: function() {
            return this.firstname + ' ' + this.lastname;
        },
        
        validate: function(){
            if(supportedLangs.indexOf(this.language) === -1){
                throw "Invalid language"
            }
        },
        
        greeting: function(){
            return greetings[this.language] + ' ' + this.firstname + '!';
        },
        
        formalGreeting: function(){
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        
        greet: function(formal){
            var msg;
            
            if(formal){
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            if(console){
                console.log(msg);
            }
            
            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function(){
            if(console){
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            return this;
        },
        
        setLang: function(lang){
            this.language = lang;
            this.validate();
            return this;
        },
        
        HTMLGreeting: function(selector, formal){
            if(!$){
                throw 'jQuery not loaded';
            }
            
            if(!selector){
                throw 'Missing jQuery selector';
            }
            
            var msg;
            if(formal){
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            $(selector).html(msg);
            
            return this;
            
        }
        
    };
    
    // This will get called everytime we use the library. it will edit the empty object created by 'new'.
    Greetr.init = function(firstname, lastname, language){
       // Basically setting all the properties that would be unique to each Greetr object
        var self = this;
        self.firstname = firstname || '';
        self.lastname = lastname || '';
        self.language = language || 'en';
        self.validate();
        
    }
    
    // Any object created by the Greetr.init function should point to Greetr.prototype for its prototype
    Greetr.init.prototype = Greetr.prototype;
    
    // Exposes the Greetr function to the window object
    global.Greetr = global.G$ = Greetr;
    
}(window, jQuery));
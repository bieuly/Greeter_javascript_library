var g = G$("billy", "hoang", "en");
g.greet().setLang("es").greet(true).log();

$('#login').click(function(){
    var loginGrtr = G$('Billy', 'Hoang');
    $('#logindiv').hide();
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});
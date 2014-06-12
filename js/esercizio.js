$(document).ready(function(){

      /*
      ** così facendo, si può anche premere invio per cercare
      ** (oltre a fare click sul bottone "Cerca") 
      */
      $("#search-text").keydown(function(event){
        if(event.keyCode==13){
           $("#search-button").trigger("click");
        }
      });

      
      $("#search-button").click(function(){

        // svuota "search-results", in caso non fosse la prima volta che si cerca
        $("#search-results").empty();

        var baseUrl = "https://api.github.com/search/repositories?q=";
        var searchQuery = $("#search-text").val();
        var queryLength = searchQuery.length;
        
        /*
        ** controllo sull'input.
        */
        if (queryLength == 0)
          $("#search-results").append("<div class='row'><div class='col-md-12'><div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>Attenzione</strong>: non hai inserito nessun termine di ricerca.</div></div>");
        else {
          $.getJSON(baseUrl+searchQuery, function(data){
            // se non ci sono risultati di ricerca... lo dico!
            if (data.total_count == 0)
              $("#search-results").append("<div class='row'><div class='col-md-12'><div class='alert alert-info alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>Attenzione</strong>: la ricerca del termine <code>"+searchQuery+"</code> non ha prodotto nessun risultato. :(</div></div>");
            else{
              // la lista dei risultati.
              for (var i = 0; i < data.total_count; i++){
                $("#search-results").append("<div class='row box-shadow margin-row'><div class='col-md-4 margin-cols'><img src='"+data.items[i].owner.avatar_url+"' alt='Immagine del profilo' class='img-thumbnail' /></div><div class='col-md-8 margin-cols'><h3><a href='"+data.items[i].owner.html_url+"' title='link al profilo'>"+data.items[i].name+"</a> <small>"+data.items[i].owner.login+"</small></h3><ul><li>Repo privato: "+data.items[i].private+"</li><li>Linguaggio di programmazione: <code>"+data.items[i].language+"</code></li></ul><div class='accordion' id='monogram-acc'><div class='accordion-group'><div class='accordion-heading'><div class='accordion-toggle accordion-toggle-styles' data-toggle='collapse' data-parent='#monogram-acc' href='#more-content-"+i+"'><h4>Più informazioni...</h4></div></div><div class='accordion-body collapse' id='more-content-"+i+"'><ul><li>Numero watchers: <code>"+data.items[i].watchers_count+"</code></li><li>Numero ticket aperti: <code>"+data.items[i].open_issues+"</code></li><li>Numero forks: <code>"+data.items[i].forks+"</code></li></ul></div></div></div></div></div>");
              }
            }
          });
        }
      });

      // svuota "search-results"
      $("#delete-button").click(function(){
        $("#search-results").empty();
      });
    });
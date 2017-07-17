console.log(data.results[0].members);

// getting values from the JSON
var members = data.results[0].members;
// creating loop    
for (var i = 0; i < members.length; i++) { //either middle name or none if no middlename

    var currentMember = data.results[0].members[i];
    var name = currentMember.first_name + " " + (currentMember.middle_name || "") + " " + currentMember.last_name
    var entry = '<tr class="' + currentMember.party + '"><td><a href="' + currentMember.url + '" target="_blank">' + name + '</a></td>';
    entry += '<td>' + currentMember.party + '</td>'; //adding to string 
    entry += '<td>' + currentMember.state + '</td>'; //
    entry += '<td>' + currentMember.seniority + '</td>'; //
    entry += '<td>' + currentMember.votes_with_party_pct + " %" + '</td></tr>';

    document.getElementById("polititians").innerHTML += entry;

}

console.log(data.results[0].members);

// getting values from the JSON
var congressmen = data.results[0].members;

// creating loop    
for (var i = 0; i < congressmen.length; i++) {
    var currentCongressmen = data.results[0].members[i]; //either middle name or none if no middlename
    var name = currentCongressmen.first_name + " " + (currentCongressmen.middle_name || "") + " " + currentCongressmen.last_name
    var entry = '<tr class="' + currentCongressmen.party + '"><td><a href="' + currentCongressmen.url + '" target="_blank">' + name + '</a></td>';
    entry += '<td>' + currentCongressmen.party + '</td>'; //adding to string 
    entry += '<td>' + currentCongressmen.state + '</td>'; //
    entry += '<td>' + currentCongressmen.seniority + '</td>'; //
    entry += '<td>' + currentCongressmen.votes_with_party_pct + " %" + '</td></tr>';

    document.getElementById("polititians").innerHTML += entry;
}

$("input.partyFilter").change(function() {
    /* der Selektor input.partyFilter wählt meine Input elemente aus, 
                                                 nämlich die checkboxen der Klasse partyFilter, durch das event *change* (check/unchecking checkbox)
                                                 wird die funktion "gecallt"
                                                 */
    console.log("clicked"); // Testen, ob clicker funktioniert
    var isChecked = $(this).is(":checked");
    var party = $(this).val(); // "R" "D" or "I"            //var party beschreibt, welche Values die inputs.partyFilter annehmen können
    $('tr.' + party).toggle(isChecked);
    /* jquery für erstellung eines neuen tr elements mit dem Value  des inputs.partyfilter,
                                                        der getogglet wurde (.toggle( isChecked ))
                                                    */
});
/// !!!!!!durch einsetzen der variablen auch 1-zeiliger code möglich
/*Jetzt verstehe ich nur nicht ganz, warum ich dieses Loopding was ich hier drunter als Comment geschrieben habe:
                    Muss ich nicht mit jquery ein neues table element dann "bauen" während durch alle Senators geloopt wird, um festzustellen, welche party
                    und je nachdem wird das passende in neue rows "geschrieben"... heißt das, dass ich durch $('tr.'+party).toggle( isChecked ) in dem Code drüber
                    automatisch die row inhalte überschreibe?


   das war mein lächerlicher Versuch ;) 
  //LOOPING through new array and add matching people to the resulting filtered table
        var $tableBody = $('<tbody></tbody>'); // new html content with jquery
        for (var i = 0; i < membersR.length; i++) { //loop through matches
            var republicanDbag = membersR[i]; //storing in variable
            var $row = $('<tr></tr>'); //creating row for it (variable)
            $row.append($('<td></td>').text(republicanDbag)); // add republican
            $tableBody.append($row); //add row to new tablebody content
        }

//PARTYFILTER müsste ja eigentlich auch für die Houseseite funktionieren. leider nicht... 
                Kriege eine Fehlermeldung für Zeile 16, aber da gehts ja um senate-data nicht um die house-data??? 


*/


for (var i = 0; i < members.length; i++) {
    var currentState = members[i].state;
    console.log(currentState);
    var liElement = '<option>' + currentState + '</option>';
    document.querySelector("#statelist").innerHTML += liElement;
}


//STATEFILTER
/*
bei Click auf ein options element (state) in der dropdown liste -> function called

  dann legen wir eine variable fest für var state und holt sich den Value /* 50 Möglichkeiten */
/*  also: var state = $("select#statelist").val()
  dann eine variable für das was geclickt wird var isClicked = $(this).is(":checked")
  und nun erstellt man die zeile mit inhalt $('tr.' +state).toggle( isClicked );   // dann wollen wir mal sehen

  */


//$("option.stateFilter").change(function() {                



//          console.log("clicked");                                 // Testen, ob clicker funktioniert
//        var isClicked = $(this).is(":clicked");      
//      var state = $(this).val(); // 50 Möglichekeiten            //var state beschreibt, welche Values die select.stateFilter annehmen können
//    $('tr.' + state ).toggle( isClicked );                /* jquery für erstellung eines neuen tr elements mit dem Value  des select.stateFilter,
//                                                       der getogglet wurde (.toggle( isClicked ))

//});

function statelist() {
    var state = $('#statelist').val();  //code gesehen mit var rex = new Regexp () ????
   // if (rex == "/all/") { clearFilter() }
    if (state == "/currentState/") {
        $('option.allStates').hide();
        $('option.filteredStates').filter(function() {
            return state.test($(this).text());
        }).show();
        $('tr.' + state).toggle();
    } else  {clearFilter ();
    }    
      


    function clearFilter() {
        $('#statelist').val('');
        $('.allStates').show();
    }}
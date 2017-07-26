$(function() {
    
    var apiurl = "https://nytimes-ubiqum.herokuapp.com/congress/113/house";
    if ($('body').hasClass('senate')) {
        apiurl = "https://nytimes-ubiqum.herokuapp.com/congress/113/senate";
    }

    $.ajax({
        url: apiurl,
        dataType: 'json',
        success: function(data) {
            console.log(data);
            var data = data.results[0].members;
            //var member = data.results[0].members;
            $.each(data, function(index, data) { //each callback function immer mit zwei Parameter index data
                console.log(data);
                var members = [];
                members.push("<tr>" + "<td>" + data.first_name + (data.middle_name || " ") + data.last_name + "</td>" + "<td>" + data.party + "</td>" + "<td>" + data.state + "</td>" + "<td>" + data.seniority + "</td>" + "<td>" + data.votes_with_party_pct + "</td>" + "</tr>");
                if ($('body').hasClass('home')) {
                    $("#polititians tbody").append(members);
                    buildPage(data);

                } else if ($('body').hasClass('overview')) {
                    

                    function getPercentageOfMembers(percentage, partyMembers) {
                        var partyMembersNeeded = Math.ceil(partyMembers.length * percentage) //percentage
                        var selectedPartyMembers = []
                        var i = 0;
                        while (selectedPartyMembers.length < partyMembersNeeded) { // while loop loops through a block of code as long as a specified condition is true
                            selectedPartyMembers.push(partyMembers[i]);
                            if (partyMembers[i].votes_with_party_pct == partyMembers[i + 1].votes_with_party_pct) {
                                partyMembersNeeded++;
                            }
                            i++;
                        }
                        return selectedPartyMembers;
                    }

                    function buildAtAGlance(data) {

                        var totalMembers = { // construct empty arrays
                            "R": [],
                            "I": [],
                            "D": []
                        }
                        $.each(members, function(i, member) { // how does computer understands this? how come it differs between R, D and I?
                            totalMembers[member.party].push(member);
                            console.log(totalMembers);
                        })
                        $(".totalDemocrats").text(totalMembers.D.length); //selecting elements by class
                        $(".totalRepublicans").text(totalMembers.R.length);
                        $(".totalIndependents").text(totalMembers.I.length);

                        function getAverageVotesForParty(partyMembers) {
                            var loyaltyPercentages = 0;
                            $.each(partyMembers, function(i, partyMember) {
                                loyaltyPercentages = loyaltyPercentages + parseFloat(partyMember.votes_with_party_pct)
                            })
                            return Math.floor(loyaltyPercentages / partyMembers.length * 100) / 100 + "%"
                        }
                        $(".totalDemocratsPercentage").text(getAverageVotesForParty(totalMembers.D)) //jquery text() method returns string value of chosen json keys
                        $(".totalRepublicansPercentage").text(getAverageVotesForParty(totalMembers.R)) //but how does computer understand totalMembers.D?
                        $(".totalIndependentsPercentage").text(getAverageVotesForParty(totalMembers.I))
                    }

                } else if ($('body').hasClass('attendance')) {
                    function buildAttendancePage(data) {

                        function getLeastEngagedPartyMembers(percentage, members) {
                            members = members.sort(function(member1, member2) {
                                return parseFloat(member1.missed_votes) - parseFloat(member2.missed_votes);
                            })
                            return getPercentageOfMembers(percentage, members);
                        }

                        function getMostEngagedPartyMembers(percentage, members) {
                            members = members.sort(function(member1, member2) {
                                return parseFloat(member2.missed_votes) - parseFloat(member1.missed_votes);
                            })
                            return getPercentageOfMembers(percentage, members);
                        }

                        var mostEngaged = getMostEngagedPartyMembers(0.1, members);
                        var leastEngaged = getLeastEngagedPartyMembers(0.1, members);

                        //$("#leastEngaged").append(leastEngaged);
                        //var currentMember = data.results[0].members[i];
                        $('#mostEngaged tbody').empty();

                        mostEngaged.forEach(function(member, i) {
                            //    var name = [member.first_name,member.middle_name,member.last_name].join(" ")
                            var row = '<tr>' + '<td>' + member.first_name + " " + (member.middle_name || "") + " " + member.last_name + '</td>' + '<td>' + member.missed_votes + '</td>' + '<td>' + member.missed_votes_pct + ' %' + '</td>' + '</tr>';
                            //$('<tr>').append('<td>')
                            $('#leastEngaged tbody').append(row);
                        });

                        //$('#leastEngaged tbody').empty();

                        leastEngaged.forEach(function(member, i) {
                            var row = '<tr>' + '<td>' + member.first_name + " " + (member.middle_name || "") + " " + member.last_name + '</td>' + '<td>' + member.missed_votes + '</td>' + '<td>' + member.missed_votes_pct + ' %' + '</td>' + '</tr>';
                            $('#mostEngaged tbody').append(row);
                        });
                    }

                } else if ($('body').hasClass('loyalty')) {
                    function buildLoyaltyPage(data) {
                        function getLeastLoyalPartyMembers(percentage, members) { //troubled with arguments, how does computer know what percentage is?
                            members = members.sort(function(member1, member2) {
                                return parseFloat(member1.votes_with_party_pct) - parseFloat(member2.votes_with_party_pct);
                            })
                            return getPercentageOfMembers(percentage, members);
                        }

                        function getMostLoyalPartyMembers(percentage, members) {
                            members = members.sort(function(member1, member2) {
                                return parseFloat(member2.votes_with_party_pct) - parseFloat(member1.votes_with_party_pct);
                            })
                            return getPercentageOfMembers(percentage, members);
                        }

                        var mostLoyal = getMostLoyalPartyMembers(0.1, members);
                        var leastLoyal = getLeastLoyalPartyMembers(0.1, members);

                        mostLoyal.forEach(function(member, i) {
                            //    var name = [member.first_name,member.middle_name,member.last_name].join(" ")
                            var row = '<tr>' + '<td>' + member.first_name + " " + (member.middle_name || "") + " " + member.last_name + '</td>' + '<td>' + member.total_votes + '</td>' + '<td>' + member.votes_with_party_pct + ' %' + '</td>' + '</tr>';
                            //$('<tr>').append('<td>')
                            $('#mostLoyal tbody').append(row);
                        });

                        //$('#leastEngaged tbody').empty();

                        leastLoyal.forEach(function(member, i) {
                            var row = '<tr>' + '<td>' + member.first_name + " " + (member.middle_name || "") + " " + member.last_name + '</td>' + '<td>' + member.total_votes + '</td>' + '<td>' + member.votes_with_party_pct + ' %' + '</td>' + '</tr>';
                            $('#leastLoyal tbody').append(row);
                        });
                    }
                }
            });
        },
        error: function() {
            alert("error");
        }
    })



    function buildPage(data) {
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
        
        var statesArr = [];

        for (var i = 0; i < data.length; i++) {
            var currentState = data[i].state;
            console.log(currentState);
            if (statesArr.indexOf(currentState) == -1) {
                statesArr.push(currentState);
            }
        }

        statesArr.sort();

        statesArr.forEach(function(value) {
            var option = '<option>' + value + '</option>';
            $('#statelist').append(option);
        });
    }
});
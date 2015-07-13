/**
 * Created by kimlong on 7/13/15.
 */
$(document).ready(function() {


    function showQuestionList(formNumber,jsonName) {
        $('#form-'+formNumber).on("click", function () {
            typeOfQuestion = "";
            $("#panelQuestion").fadeIn("slow");
            var title = $("#formTitle");


            if(formNumber === 1) {
                title.text("Form 1: Personal Information");
                typeOfQuestion = "personal";
            }else if (formNumber === 2) {
                title.text("Form 2: Interest Information");
                typeOfQuestion = "interest";
            }else if (formNumber === 3) {
                title.text("Form 3: Hobby Information");
                typeOfQuestion = "hobby";
            }

            jQuery.ajax({
                type: "GET",
                url: jsonName+".json",
                dataType: "text",
                success: function (res) {
                    var data = JSON.parse(res);
                    var question = $('#questionContainer');
                    var results = "";
                    for (var q in data) {
                        results +=
                            '<div class="form-group">' +
                                '<div class="col-sm-6">' +
                                    '<label for="">'+ data[q].question + '</label>' +
                                    '<input id="answer-'+data[q].type+'-' + data[q].id + '" type="text" class="form-control" placeholder="Answer here"><p></p>' +
                                '</div>' +
                            '</div>';
                    }
                    question.html(results);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(thrownError);
                }
            });
        });
    }

    showQuestionList(1,"questionList");
    showQuestionList(2,"form2");
    showQuestionList(3,"form3");

    function showAnswer (formNumber,type) {

        $("#submitForm").on("click",function(){

            console.log( $("#answer-1").val() );
            var jsonName;


            if (typeOfQuestion === "personal") {
                jsonName = "form1";
            }else if (typeOfQuestion === "interest") {
                jsonName = "form2";
            }else if (typeOfQuestion === "hobby") {
                jsonName = "form3";
            }

            jQuery.ajax({
                type: "GET",
                url: jsonName + ".json",
                dataType: "text",
                success:function(res) {
                    var data = JSON.parse(res);
                    var answer = $('#answerContainer');
                    var displayAnswer = "";
                    for(var q in data) {
                        displayAnswer += $("#answer-"+data[q].type+"-"+data[q].id).val() +"<br/>";
                    }
                    answer.html(displayAnswer);
                },
                error:function(xhr,ajaxOptions,thrownError) {
                    alert(thrownError);
                }
            });


        });


    }






});
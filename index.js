const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"


let getbtn = document.getElementById('button')
// let getbtn = document.getElementById('button')
getbtn.addEventListener('click', () => {
    let inputword = document.getElementById('input-word').value
    let container = document.getElementById('container')
    let phonetic = document.getElementById('phonetic')
    let word = document.getElementById('word')
    let synonymSet = new Set(); // Using Set to store unique synonyms
    container.innerHTML = "";
    synonym.innerHTML = "";
    phonetic.innerHTML = "";
    word.innerHTML = "";
    fetch(`${url}${inputword}`)
        .then((x) => x.json())
        .then((x) => {
            console.log(x)
            for (obj of x) {
                // console.log(obj.word)
                var a = []
                if (!a.includes(obj.phonetic)) {
                    a.push(obj.phonetic)
                }
                var b = a.join()

                let meanings = obj.meanings
                for (meaningvalue of meanings) {
                    for (meaningvalueindex in meaningvalue) {
                        var meaningvalueassgined = meaningvalue[meaningvalueindex]

                        if (meaningvalueassgined.length != 0) {
                            for (element of meaningvalueassgined) {
                                // console.log(ss.synonyms)
                                if (element.synonyms && element.synonyms.length > 0) {
                                    // Store synonyms in the Set
                                    element.synonyms.forEach(synonym => {
                                        synonymSet.add(synonym);
                                    });
                                }
                                if (obj.phonetic && obj.phonetic.length > 0) {
                                    phonetic.innerHTML = `Phonetic: ${b}`;
                                }
                                if (obj.word && obj.word.length > 0) {
                                    word.innerHTML = `Word: ${obj.word}`;
                                }
                                if (element.definition != undefined)
                                    container.innerHTML += `<p>${element.definition}</p><br>`;
                            }
                        }
                    }
                }
            }
            // Display unique synonyms
            if (synonymSet.size > 0) {
                let synonymsHTML = "<p>Synonyms: ";
                synonymSet.forEach(synonym => {
                    synonymsHTML += `${synonym}, `;
                });
                synonymsHTML = synonymsHTML.slice(0, -2); // Remove trailing comma and space
                synonymsHTML += "</p>";
                synonym.innerHTML = synonymsHTML;
            }
        })
        .catch(() => {
            document.getElementById('word').innerHTML = `Search not found..<i class="fa-solid fa-xmark fa-xl" style="color: #b91d34;"></i>`
        })



})

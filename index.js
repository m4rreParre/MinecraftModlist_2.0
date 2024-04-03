// Initialize JSZip instance
var zip = new JSZip();

// Array to store the checked checkboxes names of the checked checkboxes ex, option-a
var checkedCheckboxes = [];

// Array to store the checkbox states  true or false
var checkboxStates = [];

// Function to handle click event on the "Submit" button
document.getElementById("submit-btn").addEventListener("click", function() {
    // Reset the zip object
    zip = new JSZip();

    // Reset the checked checkboxes array
    checkedCheckboxes = [];

    // Loop through all checkboxes
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#option-all)');
    checkboxes.forEach(function(checkbox) {
        // If checkbox is checked, add its ID to the array
        if (checkbox.checked) {
            checkedCheckboxes.push(checkbox.id);
        }
    });

    var fetchPromises = []; // Array to store fetch promises

    // Check which checkboxes are checked and add corresponding files to zip
    if (checkedCheckboxes.includes('option-a')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/tweakeroo-fabric-1.20.4-0.19.2 (1).jar"));
    }

    if (checkedCheckboxes.includes('option-b')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/Essential-fabric_1-20-4 (1).jar"));
    }

    if (checkedCheckboxes.includes('option-c')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/fabric-api-0.96.11+1.20.4 (1).jar"));
    }

    if (checkedCheckboxes.includes('option-d')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/iris-mc1.20.4-1.6.17.jar"));
    }

    if (checkedCheckboxes.includes('option-e')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/itemscroller-fabric-1.20.4-0.22.0.jar"));
    }

    if (checkedCheckboxes.includes('option-f')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/litematica-fabric-1.20.4-0.17.2.jar"));
    }

    if (checkedCheckboxes.includes('option-g')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/malilib-fabric-1.20.4-0.18.1.jar"));
    }

    if (checkedCheckboxes.includes('option-h')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/minihud-fabric-1.20.4-0.30.2.jar"));
    }

    if (checkedCheckboxes.includes('option-i')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/modmenu-9.0.0.jar "));
    }

    if (checkedCheckboxes.includes('option-j')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/NoFog-1.3.5+1.16.5-1.20.4.jar "));
    }

    if (checkedCheckboxes.includes('option-k')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/replaymod-1.20.4-2.6.15.jar "));
    }

    if (checkedCheckboxes.includes('option-l')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/fabric-carpet-1.20.3-1.4.128+v231205.jar "));
    }

    if (checkedCheckboxes.includes('option-m')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/worldedit-mod-7.3.0.jar "));
    }

    if (checkedCheckboxes.includes('option-n')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/indium-1.0.30+mc1.20.4.jar"));
    }

    if (checkedCheckboxes.includes('option-o')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/carpet-extra-1.20.3-1.4.128.jar"));
    }

    if (checkedCheckboxes.includes('option-p')) {
        fetchPromises.push(fetchAndAddToZip("mods-1.20.4/sodium-fabric-0.5.8+mc1.20.4.jar"));
    }




    // Wait for all fetch operations to complete
    Promise.all(fetchPromises)
        .then(() => {
            if (checkedCheckboxes.length > 0) {
                // Generate the zip file asynchronously
                zip.generateAsync({type:"blob"}).then(function(content) {
                    // Create a temporary link element to trigger download
                    var link = document.createElement('a');
                    link.href = URL.createObjectURL(content);
                    link.download = "Mods.zip";
                    link.click();
                });
            } else {
                alert("Nothing Selected");
            }
        });
});

function fetchAndAddToZip(url) {
    console.log("Fetching file:", url);
    return fetch(url)
        .then(response => response.blob())
        .then(blob => {
            return new Promise((resolve, reject) => {
                var reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(blob);
            });
        })
        .then(arrayBuffer => {
            // Extract filename from the URL
            var filename = url.substring(url.lastIndexOf('/') + 1);
            zip.file(filename, arrayBuffer);
            console.log("File loaded:", filename);
            console.log("Adding file to zip:", filename);
        })
        .catch(error => {
            console.error("Error fetching file:", error);
        });
}



// Function to handle click event on the "Select All" checkbox
function checkAll(myCheckbox) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#option-all)');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = myCheckbox.checked;
    });
    // Update and display the current state of each checkbox
    displayCheckboxStates();
}

function checkMaLiLib(myCheckbox) {
    var malilib = document.querySelector('input[type="checkbox"]#option-g');
    if (myCheckbox.checked) {
        malilib.checked = true; 
    }
}

function checkSodium(myCheckbox) {
    var malilibandsodium = document.querySelectorAll('input[type="checkbox"]#option-c, input[type="checkbox"]#option-p');
    malilibandsodium.forEach(function(checkbox) {
        if (checkbox.id === 'option-c' || checkbox.id === 'option-p') {
            if (myCheckbox.checked) {
                checkbox.checked = true;
            }
        }
    });
}

function checkCarpet(myCheckbox) {
    var carpet = document.querySelector('input[type="checkbox"]#option-l');
    if (myCheckbox.checked) {
        carpet.checked = true; 
    }
}

// Function to display the current state of each checkbox
function displayCheckboxStates() {
    var checkboxes = document.querySelectorAll("input[type='checkbox']");
    // Update the checkboxStates array to reflect the current state of each checkbox
    checkboxes.forEach(function(checkbox, index) {
        checkboxStates[index] = checkbox.checked;
    });
    // Display the current state of each checkbox
    console.log("Checkbox States:", checkboxStates);
}


let state = [
    {
      id: "1",
      title: "go to Gym",
      discription: "From 6 to 7"
    },
    {
        id: "2",
        title: " Code ",
        discription: "Code daily Atleast 6 to 8 hours"
      },
        {
            id: "3",
            title: "Read Book",
            discription: "From  5 to 6 "
          }
  ]

  let updatedState = [
    {
        id: "1",
        title: "go to Gym",
        discription: "From 5 to 6"
      },
      {
          id: "2",
          title: " Code ",
          discription: "Code daily Atleast 10 hours"
        },
          {
              id: "3",
              title: "Read Book",
              discription: "From  4 to 5 "
            },
    {
      id: "4",
      title: "Go to library",
      discription: "From 10 to 5"
    },
    {
        id: "5",
        title: " market",
        discription: "from 8 to 9"
      }
  

  ]


class MakeState {
    constructor(state, rootId = "mainArea"){
        this.state = state;
        this.rootId = rootId
    }
    updateState(newState){
        let {newelyAddedState, updatedState, deletedState } = this.findDiff(this.state, newState);
        if(newelyAddedState && newelyAddedState.length){
            this.appendAddedState(newelyAddedState);
        }
        if(deletedState){
            this.removeDeletedState(deletedState)
        }
        if(updatedState && updatedState.length){
            this.updatePartialState(updatedState)
        }
    }
    init(howUserwantToAppendMyStateToHtml){
        let div1 = addChild({ parentId : this.rootId, childTagName : "div", childValue: null, childId: "div1" });
        howUserwantToAppendMyStateToHtml(state, "div1");
    }
    addChild ( obj ){
        let {parentId, childTagName, childValue, childId } = obj
        let parent = document.getElementById(parentId);
        let child = document.createElement(childTagName);
        if(childId){
            child.setAttribute("id",childId);
        }
        if(childValue){
            child.innerHTML = childValue
        }
        parent.appendChild(child)
        return child;
    }
    //constraint : cannot add new key to state, onlt onle level deep 
    // state1 = current  || state2 = updated
    //! figure out deleted state
    /**
     * 
     * @param {Array} state1 (previous state)
     * @param {Array} state2 (updated state)
     * @returns it returns newelyAddedState, updatedState, deletedState arrays or null
     */
    findDiff(state1, state2){
        if(JSON.stringify(state1) === JSON.stringify(state2)) {
            return null;
        }
        let deletedState = [];
        let updatedState = []
        let currentlyInUseId_state1=[]

        for(let i = 0; i< state1.length; i++){
            let state1Obj = state1[i];
            let state2Obj = state2.find(el => { 
                if(el.id === state1Obj.id) { 
                    currentlyInUseId_state1.push(el.id)
                    return true
                }
                return false
            });
            //skip for same values
            if(JSON.stringify(state1Obj) === JSON.stringify(state2Obj)){
                continue;
            }
            // check for deleted one
            if(!state2Obj){
            deletedState.push(state1Obj.id);
            continue;
            }
            //check for updated one
            let keys = Object.keys(state1Obj)

            let updatedKeyObj = {
                id: state1Obj.id,
                update: []
            };
            for(let j = 0; j< keys.length; j++){
                if(state1Obj[keys[j]] === state2Obj[keys[j]] || keys[j] === "id"){
                    //do nothing
                }
                else{
                    let obj = {
                        key : keys[j], 
                        prevVal : state1Obj[keys[j]], 
                        currVal : state2Obj[keys[j]]
                    }
                    updatedKeyObj.update.push(obj)
                }
            }

            if(updatedKeyObj.update.length){
                updatedState.push(updatedKeyObj)
            }

        }

        let newelyAddedState = state2.filter(el => !currentlyInUseId_state1.includes(el.id))

        return {newelyAddedState, updatedState, deletedState}
        
    }

    // got to look out for the id that has been passed
    appendAddedState(newState){
        for(let i=0; i<newState.length; i++){
            todo(newState[i], newState[i], "div1");
        }
    }

    removeDeletedState(deletedState){
        for(let i=0; i<deletedState.length; i++){            
            let elem = document.getElementById(deletedState[i])
            elem.remove()
            // deleteById(deletedState[i])
        }
    }
    updatePartialState(updatedState){
        for (let i = 0; i < updatedState.length; i++) {
            const id = updatedState[i].id;
            let updated = updatedState[i].update
            for (let tagIdx = 0; tagIdx < updated.length; tagIdx++) {
                document.getElementById(updated[tagIdx].key+id).innerHTML = updated[tagIdx].currVal
                // const element = array[tagIdx];
                
            }
            
        }
    }

}


/**
 * -----------------------------------------------------
 * Below code shows the usage of class and its functions
 * below is the sampl case where state got updated after 3 sec
 */

let reconsile = new MakeState(state)

reconsile.init(howUserwantToAppendMyStateToHtml)

setTimeout(()=>{
    reconsile.updateState(updatedState)
}, 3000)

//------------------------------------------------------





/**
 * ------------------------------------------------------
 * below code is provided by the user
 * it tell how the user want the state to be shown on the html
 */
 function howUserwantToAppendMyStateToHtml(state, rootId){
    for(let i =0; i<state.length; i++){
        todo(state[i],state[i].id, rootId)
    }
}
function todo(state, i, parentId){

    let wrapperDiv = addChild({ parentId : parentId, childTagName :  "div", childValue: null, childId: i})

    let labelForTitle = addChild({ parentId : i, childTagName :  "label", childValue: "Title: " })
    let spanOfTitle = addChild({ parentId : i, childTagName :  "span", childValue: state.title, childId: "title"+i})
    addChild({ parentId : i, childTagName :  "br"})

    let labelForDisc = addChild({ parentId : i, childTagName :  "label", childValue: "Discription : "})
    let spanOfDisc = addChild({ parentId : i, childTagName :  "span", childValue: state.discription, childId: "discription"+i});
    addChild({ parentId : i, childTagName :  "br"})

    let deleteButton = addChild({ parentId : i, childTagName :  "button", childValue: "Delete", childId: "del"+i})
    addChild({ parentId : i, childTagName :  "br"})
}


function addChild ( obj ){
    let {parentId, childTagName, childValue, childId } = obj
    let parent = document.getElementById(parentId);
    let child = document.createElement(childTagName);
    if(childId){
        child.setAttribute("id",childId);
    }
    if(childValue){
        child.innerHTML = childValue
    }
    parent.appendChild(child)
    return child;
}

//-------------------------------------------------------

module.exports = MakeState
# reconciler
 "Reconsiler serves as a foundational attempt to emulate React's fundamental behavior. It enhances comprehension of underlying DOM operations and illustrates React's approach to state updates."
 /**
 * ----------------------------------------
 * Below code shows the usage of class and its functions
 * below is the samplecase where state got updated after 3 sec
 */

```
let reconsile = new MakeState(state)

reconsile.init(howUserwantToAppendMyStateToHtml)

setTimeout(()=>{
    reconsile.updateState(updatedState)
}, 3000)

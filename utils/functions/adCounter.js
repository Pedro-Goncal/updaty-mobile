const adCouter = () => {
    let clickCount = 0
    let lastShowAdTime = 0


    if(clickCount % 2 === 0 && Date.now() - lastShowAdTime >= 5000){
        lastShowAdTime = Date.now()
        return (true)
    } else {
        return false
    }
}
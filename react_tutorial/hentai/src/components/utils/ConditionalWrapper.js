
let ConditionalWrapper = ( condition , wrapperFunction , child ) =>
{
    console.log( "condition: " + JSON.stringify(condition) )
    console.log( "wrapperFunction: " + JSON.stringify(wrapperFunction) )
    console.log( "child: " + child)
    if( condition )
    {
        return wrapperFunction(child)
    }
    return child
}

export default ConditionalWrapper

const LoadingComponent = ({mensaje, classString}) => {
  return (
    <div className={classString} >
        <span className="text-xs" >{mensaje}</span>
    </div>
  )
}

export default LoadingComponent

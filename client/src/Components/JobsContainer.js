import { useAppContext } from '../Context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Wrapper from '../assets/wrappers/JobsContainer'
import Job from './Job'




const JobsContainer = () => {
    const { jobs, getAllJobs, isLoading, page, totalJobs } = useAppContext()
    useEffect(() => {
      getAllJobs()
    }, []) 

    if (isLoading) {
        return <Loading center />
      }


      if (jobs.length === 0) {
        return (
          <Wrapper>
            <h2>No jobs to displays...</h2>
          </Wrapper>
        )
      }


return (
<Wrapper>
  <h5>
  {totalJobs} job{jobs.length> 1 && 's'} found
  </h5>
  
  <div className='jobs'></div>

  {jobs.map((job)=>{
return <Job key={job._id}{...job}/>
  })}

  
</Wrapper>
)
 
}

export default JobsContainer
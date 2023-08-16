import { useSelector, useDispatch } from "react-redux"
import commentsActions from "../store/actions/comments"
import { useEffect, useRef } from "react"
import { useParams } from "react-router-dom";
import Comment from "./Comment";

const { readComments, createComment } = commentsActions

export default function Comments() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const inputComment = useRef()
    const storeComments = useSelector(store => store.comments) 
    const comments = useSelector(store => store.comments.comments)
    const next = useSelector(store => store.comments.next)
    const prev = useSelector(store => store.comments.prev)
    
    useEffect(
        () => {
            dispatch(readComments(id))
        }, [storeComments] //se agrega storeComments para que actualice y no salga el error del usuario REVISAR
    )

    const sendComment = () => {
        let dataComment = {
            description: inputComment.current?.value.trim(),
            chapter_id: id
        }
        dispatch(createComment(dataComment))
    }

    return (
        <div className="pt-[50px]">
            {comments.map(each => <Comment each={each} key={each._id}/>)}
            <div className="flex justify-center items-center">
                {prev && <button className='bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white rounded-full m-5 w-[100px] h-[40px] transition hover:scale-110' value={prev}>Prev</button>}
                {next && <button className='bg-gradient-to-r from-[#FF5722] to-[#F97316] text-white rounded-full m-5 w-[100px] h-[40px] transition hover:scale-110' value={next}>Next</button>}
            </div>
            <div className="flex w-full justify-center h-[68px] bg-[#EBEBEB] pb-5">
                <input ref={inputComment} className="relative flex w-[80%] pl-5 rounded-lg bg-[#EBEBEB] border border-gray-400" type="text" placeholder="Say something here..." ></input>
                <span className="absolute right-[15%] pt-3 cursor-pointer" onClick={sendComment}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </span>
            </div>
        </div >
    )
}

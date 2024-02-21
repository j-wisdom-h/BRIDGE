export default function IntroductionTab({ postInfo }) {
    // 기간, 현재인원수, 아이콘
    const { title, content, location, num, atTime } = postInfo
    return (
        <div className="card bg-base-100 shadow-xl h-52 p-5">
            <p> titel : {title}</p>
            <p> content : {content}</p>
            <p> location : {location}</p>
            <p> num : {num}</p>
            <p> atTime : {atTime}</p>
        </div>
    )
}

export function ShowCourse({ course }) {
    return (
        <div style={{ width: 300, position: 'relative', overflow: 'hidden', cursor: 'pointer', alignItems: 'center' }} className="card">
            <img src={course.imageLink} alt="Image"
                style={{ borderTopLeftRadius: '.5rem', width: '100%' }} />
            <div style={{ padding: '15px', position: 'absolute', zIndex: 10, bottom: '0%', backgroundColor: 'rgba(255,255,255,0.705)', width: '100%', transition: '0.3s' }} className="textContent">
                <div style={{
                    fontSize: '1.5rem', lineHeight: '2rem'
                }}> {course.title}</div>
                <div style={{
                    fontSize: '0.875rem', lineHeight: '1.25rem'
                }} className="textchild"> {course.description}</div>
            </div>
        </div>
    )
}
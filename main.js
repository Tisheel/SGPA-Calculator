
const getSyllabus = async () => {
    const res = await fetch('./syllabus.json')
    const data = await res.json()
    return data
}

const displaySyllabus = async () => {
    const data = await getSyllabus()
    const divMain = document.createElement('div')
    for (item of data) {
        const h2 = document.createElement('h2')
        h2.innerText = item.stream
        divMain.appendChild(h2)
        for (sub of item.subjects) {
            const div = document.createElement('div')
            div.setAttribute('class', 'subject')
            const inputText = document.createElement('input')
            inputText.setAttribute('type', 'number')
            inputText.setAttribute('value', 0)
            inputText.setAttribute('data-stream', item.stream)
            inputText.setAttribute('data-subjectCode', sub.subjectCode)
            inputText.setAttribute('max', 100)
            inputText.setAttribute('min', 0)
            const label = document.createElement('label').innerText = sub.subjectTitle + '(' + sub.subjectCode + ')'
            div.append(label, inputText)
            divMain.appendChild(div)
        }
    }

    document.getElementById('root').appendChild(divMain)
}

displaySyllabus()

const submitBtn = document.getElementById('submit-btn')

submitBtn.addEventListener('click', async () => {
    const subjects = document.querySelectorAll('input[type="number"]')
    const data = await getSyllabus()

    let creditXmarks = 0
    let credits = 0

    for (marks of subjects) {
        if (marks.value > 0) {
            const subjectCode = marks.getAttribute('data-subjectCode')
            const stream = marks.getAttribute('data-stream')
            const subjectMarks = marks.value

            for (item of data) {
                if (item.stream === stream) {
                    const subject = item.subjects.find(e => e.subjectCode === subjectCode)
                    creditXmarks = creditXmarks + (subject.credit * (Math.floor(subjectMarks / 10) + 1))
                    credits = credits + subject.credit
                }
            }
        }
    }

    document.getElementById('sgpa').innerText = (creditXmarks / credits).toFixed(2)
})

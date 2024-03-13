const FRONTEND_LANGUAGES = ['HTML', 'CSS', 'JavaScript']

const BACKEND_LANGUAGES = [
    'Java',
    'Python',
    'JavaScript',
    'Node.js',
    'Spring Boot',
    'Django',
    'Express.js',
    'PHP',
    'Ruby on Rails',
]

const MOBILE_LANGUAGES = [
    'Java',
    'Kotlin',
    'Swift',
    'Objective-C',
    'JavaScript',
]

const ALL_LANGUAGES = new Set([
    ...FRONTEND_LANGUAGES,
    ...BACKEND_LANGUAGES,
    ...MOBILE_LANGUAGES,
])

const DATABASE_TECHNOLOGIES = [
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Oracle',
    'SQL',
]

const DEVELOPMENT_TOOLS = [
    'Git',
    'GitHub',
    'Bitbucket',
    'SVN',
    'IntelliJ IDEA',
    'Visual Studio Code',
    'Eclipse',
    'WebStorm',
]

const DEVELOPMENT_METHODOLOGIES = ['Jira', 'Trello', 'Asana']

const CI_CD_TOOLS = ['Jenkins', 'Travis CI', 'CircleCI', 'GitLab CI/CD']

const CLOUD_PLATFORMS = ['AWS', 'Azure', 'Google Cloud Platform']

const API_TECHNOLOGIES = ['API', 'RESTful API', 'GraphQL']

const ADDITIONAL_KEYWORDS = [
    '개발 프로세스',
    '워터폴',
    '애자일',
    '코딩 스타일',
    'PEP8',
    'CamelCase',
    '보안',
    '인증',
    '권한 관리',
    '성능 최적화',
    '캐싱',
    '로딩 시간',
    '사용자 경험',
    'UI/UX 디자인',
]

export {
    ADDITIONAL_KEYWORDS,
    ALL_LANGUAGES,
    API_TECHNOLOGIES,
    BACKEND_LANGUAGES,
    CI_CD_TOOLS,
    CLOUD_PLATFORMS,
    DATABASE_TECHNOLOGIES,
    DEVELOPMENT_METHODOLOGIES,
    DEVELOPMENT_TOOLS,
    FRONTEND_LANGUAGES,
    MOBILE_LANGUAGES,
}

import styled from 'styled-components'

export const HeaderWrapper = styled.div.attrs({
    contentColor: '#f429e4'
})`
    font-size: 18px;
    font-weight: 600;
    border: 1px solid #000;
    border-radius: 30px;
    .tilte {
        color: ${props => props.color}
    }
    .content {
        color: ${props => props.contentColor}
    }
`

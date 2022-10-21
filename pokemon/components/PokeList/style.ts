import styled from '@emotion/styled'

export const Wrapper = styled.div`
  padding: 0 5rem;
`

export const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
`

// Card

export const CardWrapper = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  display: inline-flex;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;
  cursor: pointer;
  transition: 0.2s;

  :hover {
    transform: scale(1.1);
  }
`

export const PokemonName = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`

import Link from "next/link"
import styled from "styled-components"

interface NavbarProps {
  brandName: string
  children?: React.ReactNode
}

export default function LandingNavbar(props: NavbarProps) {
  return (
    <NavbarContainer>
      <div className="left">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 490.1 490.1"
        >
          <g>
            <path
              d="M431.213,469.1V89.7c0-11.5-9.4-20.9-20.9-20.9h-67.3l-1.5-11.5c-1-10.4-9.4-17.7-19.8-17.7h-55.3V20.9
		c0-11.5-9.4-20.9-20.9-20.9s-20.9,9.4-20.9,20.9v18.8h-56.3c-9.4,0-18.8,7.3-19.8,17.7l-1.8,12.5h-67c-11.5,0-20.9,9.4-20.9,20.9
		v378.4c0,11.5,9.4,20.9,20.9,20.9h331.5C422.813,490,432.213,480.6,431.213,469.1z M304.013,80.3l7.3,55.3h-132.4l8.3-55.3H304.013
		z M390.513,449.3h-290.9V111.6h41.3l-5.8,40.7c-1.6,12.9,9.2,24,20.9,24h179.3c11.5,0,23.4-7.6,18.8-26.1l-5.3-39.6h41.8v338.7
		H390.513z"
            />
          </g>
        </svg>
        <Link href="">
          <b className="brandname prime-link">{props.brandName}</b>
        </Link>
        <Link href="about">About</Link>
        <Link href="https://github.com/Greek/NoteZ">Source</Link>
      </div>
    </NavbarContainer>
  )
}

export const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 1.25rem;
  font-size: 1.25rem;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  height: 4rem;

  & > .left {
    display: flex;
    flex-direction: row;
  }

  & > .left > a {
    color: black;
    text-decoration: underline;
    font-weight: 600;
    font-size: 1.25rem;
    padding-right: 10px;
  }

  .left > .brandname {
    /* font-weight: 600; */

    color: black;
    align-content: center;
    padding-right: 15px;
  }

  .left > svg {
    /* padding-top: .4rem; */
    font-size: 10px;
  }

  .left > .brandname:hover {
    text-decoration: underline;
  }
`

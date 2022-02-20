import { cleanup, render, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Home';
import Navbar from '../Navbar';
import TableData from '../TableData';
import ModalBox from '../ModalBox';
import axios from 'axios';

beforeEach(() => {
    document.body.innerHTML = "";
})

afterEach(() => {
    cleanup();
})

describe("Home Components Test", () => {
    test("Box Test", () => {
        const component = render(<Home />)
        const box = component.getByTestId('homeBox');
        expect(box).toBeTruthy();
    })
    test("Create Snapshot Test", () => {
        act(() => {
            const component = render(<Home />)
            expect(component).toMatchSnapshot();
        })
    })
})

describe("Navbar Components Test", () => {
    test("Heading Test", () => {
        const component = render(<Navbar handleSearch={jest.fn()} />);
        const heading = component.getByTestId('heading');
        expect(heading.textContent).toBe('Fetch-Post');
    })
    test("Input Field Test", () => {
        const component = render(<Navbar handleSearch={jest.fn()} />);
        const textField = component.getByTestId('textField');
        expect(textField).toBeTruthy();
    })
    test("Create SnapShot Test", () => {
        act(() => {
            const component = render(<Navbar handleSearch={jest.fn()} />);
            expect(component).toMatchSnapshot();
        })
    })
})

describe("TableData Components Test", () => {
    const post = [
        {
            title: "abc",
            author: "xyz",
            url: "mvvc",
            created_at: "kmfk"
        },
        {
            title: "abc",
            author: "xyz",
            url: "mvvc",
            created_at: "kmfk"
        }
    ]
    test("Table Heading Test", () => {
        const component = render(<TableData data={post} handleClick={jest.fn()} showData={false} searchValue={post} />);
        const title = component.getByTestId('title');
        const author = component.getByTestId('author');
        const url = component.getByTestId('url');
        const created_at = component.getByTestId('created_at');
        expect(title.textContent).toBe("Title");
        expect(author.textContent).toBe("Author");
        expect(url.textContent).toBe("Url");
        expect(created_at.textContent).toBe("Created_at");
    })
    test("Create SnapShot Test", () => {
        act(() => {
            const component = render(<TableData data={post} handleClick={jest.fn()} showData={false} searchValue={post} />);
            expect(component).toMatchSnapshot();
        })
    })
})

describe("ModalBox Component Test", () => {
    const post = {
        title: "abc",
        author: "xyz",
        url: "mvvc",
        created_at: "kmfk"
    }

    test("Modal Data Test", () => {
        const component = render(<ModalBox open={true} jsonData={post} handleClose={jest.fn()} />);
        const modalBox = component.getByTestId('modalBox');
        expect(modalBox.textContent).toBe(JSON.stringify(post));
    })

    test("Create SnapShot Test", () => {
        act(() => {
            const component = render(<ModalBox open={true} jsonData={post} handleClose={jest.fn()} />);
            expect(component).toMatchSnapshot();
        })
    })
})

describe("Api Test", () => {
    const mockUrl = 'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0';
    const mockData = { data: {} };
    const getData = jest.fn((url) => {
        return mockData;
    })
    test("Return Data", () => {
        expect(getData(mockUrl)).toBe(mockData);
    })
    test("Return url", () => {
        expect(getData).toBeCalledWith(mockUrl);
    })
    test("Api status", async () => {
        await act(async () => {
            const responce = await axios.get("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0");
            expect(responce.status).toBe(200);
        })
    })
})
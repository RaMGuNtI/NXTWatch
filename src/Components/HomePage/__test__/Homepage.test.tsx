// import { HomeStore } from '../../../Store/homeStore';
// import HomePage from '..';
// import { screen, render, waitFor, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { MemoryRouter } from 'react-router-dom';
// import { AppProvider } from '../../../Context/ThemeSaveContext';
// describe('HomeStore Tests', () => {
//   beforeEach(() => {
//     global.fetch = jest.fn();
//   });

//   test('Intial Values', () => {
//     const homeStore = new HomeStore();
//     expect(homeStore.searchInput).toBe('');
//     expect(homeStore.fetchedVideos).toEqual({ videos: [] });
//     expect(homeStore.loader).toBeTruthy();
//   });

//   test('fetching data Works', async () => {
//     const homeStore = new HomeStore();
//     const dummyResponse = {
//       videos: [
//         {
//           id: '1',
//           channel: { name: 'Dummy Channel', profile_image: 'dummy.jpg' },
//           published_at: '2024-01-01',
//           thumbnail_url: 'thumb.jpg',
//           title: 'Dummy Video',
//           view_count: '1000',
//         },
//       ],
//     };
//     (global.fetch as jest.Mock).mockResolvedValue({
//       json: jest.fn().mockResolvedValue(dummyResponse),
//     });
//     await homeStore.getvideos();
//     expect(homeStore.fetchedVideos).toEqual(dummyResponse);
//     expect(homeStore.loader).toBeFalsy();
//   });
// });

// describe('Component Checking', () => {
//   test('Initial Render Components testing', async () => {
//     const dummyResponse = {
//       videos: [
//         {
//           id: '1',
//           channel: { name: 'Dummy Channel', profile_image: 'dummy.jpg' },
//           published_at: '2024-01-01',
//           thumbnail_url: 'thumb.jpg',
//           title: 'Dummy Video',
//           view_count: '1000',
//         },
//       ],
//     };

//     (global.fetch as jest.Mock).mockResolvedValue({
//       json: jest.fn().mockResolvedValue(dummyResponse),
//     });

//     render(
//       <MemoryRouter>
//         <AppProvider>
//           <HomePage />
//         </AppProvider>
//       </MemoryRouter>
//     );
//     expect(screen.getByTestId('loader')).toBeInTheDocument();
//     await waitFor(() =>
//       expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
//     );
//     const BannerComp = await screen.findByTestId('banner');
//     const inputSection = await screen.findByTestId('input-section');
//     const inputBox = screen.getByPlaceholderText('Search');
//     expect(inputSection).toBeInTheDocument();
//     expect(BannerComp).toBeInTheDocument();
//     expect(await screen.findByText('Dummy Video')).toBeInTheDocument();
//     const closeBannerBtn = screen.getByTestId('close-btn');
//     fireEvent.click(closeBannerBtn);
//     expect(BannerComp).not.toBeVisible();
//     fireEvent.change(inputBox, { target: { value: 'search term' } });
//     const searchBtn = screen.getByText('🔍');
//     fireEvent.click(searchBtn);
//     expect(screen.getByTestId('loader')).toBeInTheDocument();
//     await waitFor(() =>
//       expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
//     );
//     expect(await screen.findByText('Dummy Video')).toBeInTheDocument();
//   });
// });

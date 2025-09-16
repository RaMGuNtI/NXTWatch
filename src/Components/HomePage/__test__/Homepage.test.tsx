// import HomePage from '..';
// import { screen, render, waitFor, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { MemoryRouter } from 'react-router-dom';
// import { Provider } from 'mobx-react';
// import rootAppStore from '../../../Store/RootAppStore';
// describe('HomeStore Tests', () => {
//   beforeEach(() => {
//     global.fetch = jest.fn();
//   });

//   test('Intial Values', () => {
//     const { searchInput, fetchedVideos, apiStatus } = rootAppStore.videoStore;
//     expect(searchInput).toBe('');
//     expect(fetchedVideos).toEqual({ videos: [] });
//     expect(apiStatus).toEqual('pending');
//   });

//   test('fetching data Works', async () => {
//     const { apiStatus, fetchHomepageVideos } = rootAppStore.videoStore;
//     const dummyResponse = {
//       videos: [
//         {
//           id: '1',
//           channel: {
//             name: 'Dummy Channel',
//             profile_image_url: 'dummy.jpg',
//             subscriber_count: 12,
//           },
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
//     await fetchHomepageVideos();
//     const { fetchedVideos } = rootAppStore.videoStore;
//     console.log(fetchedVideos);
//     expect(fetchedVideos).toEqual(dummyResponse);
//     expect(apiStatus).toBe('success');
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
//         <Provider rootAppStore={rootAppStore}>
//           <HomePage />
//         </Provider>
//       </MemoryRouter>
//     );
//     expect(screen.getByTestId('loader')).toBeInTheDocument();
//     await waitFor(() =>
//       expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
//     );
//     const BannerComp = await screen.findByTestId('banner');
//     const inputSection = await screen.findByTestId('input-section');
//     const inputBox = await screen.getByPlaceholderText('Search');
//     expect(inputSection).toBeInTheDocument();
//     expect(BannerComp).toBeInTheDocument();
//     expect(await screen.findByText('Dummy Video')).toBeInTheDocument();
//     const closeBannerBtn = screen.getByTestId('close-btn');
//     fireEvent.click(closeBannerBtn);
//     expect(BannerComp).not.toBeVisible();
//     //     fireEvent.change(inputBox, { target: { value: 'search term' } });
//     //     const searchBtn = screen.getByText('🔍');
//     //     fireEvent.click(searchBtn);
//     //     expect(screen.getByTestId('loader')).toBeInTheDocument();
//     //     await waitFor(() =>
//     //       expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
//     //     );
//     //     expect(await screen.findByText('Dummy Video')).toBeInTheDocument();
//   });
// });

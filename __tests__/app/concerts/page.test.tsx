import { render, screen } from '@testing-library/react';
import ConcertsPage from '@/app/concerts/page';

// モックデータ
const mockConcerts = [
  {
    id: '1',
    title: 'テストコンサート1',
    date: '2024-05-01',
    venue: 'テスト会場1',
    posterUrl: '/test-poster-1.jpg',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'テストコンサート2',
    date: '2024-06-01',
    venue: 'テスト会場2',
    posterUrl: '/test-poster-2.jpg',
    status: 'upcoming',
  },
];

// APIレスポンスのモック
jest.mock('@/lib/microcms', () => ({
  client: {
    get: jest.fn(() => Promise.resolve({ contents: mockConcerts })),
  },
}));

describe('Concerts Page', () => {
  it('renders concert list', async () => {
    render(await ConcertsPage());

    // コンサートのタイトルが表示されているか確認
    expect(screen.getByText('テストコンサート1')).toBeInTheDocument();
    expect(screen.getByText('テストコンサート2')).toBeInTheDocument();

    // 会場情報が表示されているか確認
    expect(screen.getByText('テスト会場1')).toBeInTheDocument();
    expect(screen.getByText('テスト会場2')).toBeInTheDocument();

    // ポスター画像が表示されているか確認
    const posters = screen.getAllByRole('img');
    expect(posters).toHaveLength(2);
    expect(posters[0]).toHaveAttribute('src', '/test-poster-1.jpg');
    expect(posters[1]).toHaveAttribute('src', '/test-poster-2.jpg');
  });

  it('renders concert cards with proper accessibility attributes', async () => {
    render(await ConcertsPage());

    // コンサートカードが適切なアクセシビリティ属性を持っているか確認
    const cards = screen.getAllByRole('button');
    cards.forEach((card) => {
      expect(card).toHaveAttribute('tabIndex', '0');
      expect(card).toHaveAttribute('aria-label');
    });
  });
}); 
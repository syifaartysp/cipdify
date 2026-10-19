'use client';

import { useState, useEffect } from 'react';
import { 
  Music, 
  Star, 
  Edit3, 
  Trash2, 
  Search, 
  PlusCircle, 
  Disc, 
  Sparkles,
  X,
  Sun,
  Moon,
  Globe
} from 'lucide-react';

const TRANSLATIONS = {
  ID: { 
    welcomeTitle: 'Selamat Datang di Cipdify',
    welcomeSub: 'Abadikan lagu favorit, kenangan, dan jurnal musik pribadi kamu di sini.',
    subtitle: 'Your Personal Sound Sanctuary', 
    totalArchive: 'Total Arsip Lagu', 
    topFavorites: 'Lagu Favorit (⭐ 5)', 
    addTitle: 'Tambah Lagu Baru', 
    editTitle: 'Edit Lagu', 
    cancel: 'Batal', 
    labelTitle: 'Judul', 
    labelArtist: 'Artis', 
    labelAlbum: 'Album', 
    labelGenre: 'Genre', 
    labelRating: 'Rating (1 - 5 ⭐)', 
    labelCover: 'Pratinjau Cover Album', 
    labelSpotify: 'Tautan Spotify', 
    labelNotes: 'Catatan Pribadi (Opsional)', 
    placeholderNotes: 'Kenapa kamu suka lagu ini?', 
    btnSave: 'Simpan ke Arsip', 
    btnUpdate: 'Perbarui Lagu', 
    searchPlaceholder: 'Cari artis, judul, genre...', 
    autoSelectTag: '✨ Pilih Lagu Otomatis', 
    coverFilled: '✨ Cover terisi otomatis', 
    noCover: 'Belum ada cover', 
    coverSub: 'Cari judul atau artis di atas untuk isi cover otomatis', 
    deleteHeader: 'Hapus Lagu Ini?', 
    deleteSub: 'Lagu akan dihapus permanen dari arsip Cipdify.', 
    btnDeleteConfirm: 'Ya, Hapus', 
    noTracks: 'Tidak ada lagu yang ditemukan.', 
    loading: 'Memuat arsip...' 
  },
  EN: { 
    welcomeTitle: 'Welcome to Cipdify',
    welcomeSub: 'Archive your favorite songs, memories, and personal sound sanctuary here.',
    subtitle: 'Your Personal Sound Sanctuary', 
    totalArchive: 'Total Track Archive', 
    topFavorites: '5-Star Favorites', 
    addTitle: 'Add New Track', 
    editTitle: 'Edit Track', 
    cancel: 'Cancel', 
    labelTitle: 'Title', 
    labelArtist: 'Artist', 
    labelAlbum: 'Album', 
    labelGenre: 'Genre', 
    labelRating: 'Rating (1 - 5 ⭐)', 
    labelCover: 'Album Cover Preview', 
    labelSpotify: 'Spotify Link', 
    labelNotes: 'Personal Notes (Optional)', 
    placeholderNotes: 'Why do you love this song?', 
    btnSave: 'Save to Archive', 
    btnUpdate: 'Update Track', 
    searchPlaceholder: 'Search artist, title, genre...', 
    autoSelectTag: '✨ Auto Select Song', 
    coverFilled: '✨ Cover auto-filled', 
    noCover: 'No cover yet', 
    coverSub: 'Search song title or artist above to auto-fill cover', 
    deleteHeader: 'Delete This Track?', 
    deleteSub: 'Track will be permanently removed from Cipdify archive.', 
    btnDeleteConfirm: 'Yes, Delete', 
    noTracks: 'No tracks found.', 
    loading: 'Loading archive...' 
  },
  IT: { 
    welcomeTitle: 'Benvenuto su Cipdify',
    welcomeSub: 'Archivia le tue canzoni preferite e il tuo santuario sonoro personale.',
    subtitle: 'Il tuo santuario sonoro personale', 
    totalArchive: 'Archivio Totale Brani', 
    topFavorites: 'Preferiti (⭐ 5)', 
    addTitle: 'Aggiungi Nuovo Brano', 
    editTitle: 'Modifica Brano', 
    cancel: 'Annulla', 
    labelTitle: 'Titolo', 
    labelArtist: 'Artista', 
    labelAlbum: 'Album', 
    labelGenre: 'Genere', 
    labelRating: 'Valutazione (1 - 5 ⭐)', 
    labelCover: 'Anteprima Copertina', 
    labelSpotify: 'Link Spotify', 
    labelNotes: 'Note Personali (Opzionale)', 
    placeholderNotes: 'Perché ti piace questa canzone?', 
    btnSave: 'Salva nell\'Archivio', 
    btnUpdate: 'Aggiorna Brano', 
    searchPlaceholder: 'Cerca artista, titolo, genere...', 
    autoSelectTag: '✨ Selezione Automatica', 
    coverFilled: '✨ Copertina inserita', 
    noCover: 'Nessuna copertina', 
    coverSub: 'Cerca il titolo o l\'artista sopra per riempire la copertina', 
    deleteHeader: 'Eliminare questo brano?', 
    deleteSub: 'Il brano verrà rimosso permanentemente.', 
    btnDeleteConfirm: 'Sì, Elimina', 
    noTracks: 'Nessun brano trovato.', 
    loading: 'Caricamento...' 
  },
  NL: { 
    welcomeTitle: 'Welkom bij Cipdify',
    welcomeSub: 'Sla je favoriete nummers, herinneringen en persoonlijke geluidsarchief hier op.',
    subtitle: 'Jouw persönliche geluidsheiligdom', 
    totalArchive: 'Totaal Nummerarchief', 
    topFavorites: 'Favorieten (⭐ 5)', 
    addTitle: 'Nieuw Nummer Toevoegen', 
    editTitle: 'Nummer Bewerken', 
    cancel: 'Annuleren', 
    labelTitle: 'Titel', 
    labelArtist: 'Artiest', 
    labelAlbum: 'Album', 
    labelGenre: 'Genre', 
    labelRating: 'Beoordeling (1 - 5 ⭐)', 
    labelCover: 'Albumhoes Voorbeeld', 
    labelSpotify: 'Spotify Link', 
    labelNotes: 'Persoonlijke Notities (Optioneel)', 
    placeholderNotes: 'Waarom hou je van dit nummer?', 
    btnSave: 'Opslaan in Archief', 
    btnUpdate: 'Nummer Bijwerken', 
    searchPlaceholder: 'Zoek artiest, titel, genre...', 
    autoSelectTag: '✨ Automatisch Selecteren', 
    coverFilled: '✨ Hoes automatisch ingevuld', 
    noCover: 'Nog geen hoes', 
    coverSub: 'Zoek hierboven om de hoes in te vullen', 
    deleteHeader: 'Dit nummer verwijderen?', 
    deleteSub: 'Het nummer wordt permanent verwijderd.', 
    btnDeleteConfirm: 'Ja, Verwijderen', 
    noTracks: 'Geen nummers gevonden.', 
    loading: 'Laden...' 
  },
  AR: { 
    welcomeTitle: 'مرحباً بك في Cipdify',
    welcomeSub: 'أرشف أغاميك المفضلة وذكرياتك وملاذك الصوتي الشخصي هنا.',
    subtitle: 'ملاذك الصوتي الشخصي', 
    totalArchive: 'إجمالي أرشيف المقاطع', 
    topFavorites: 'المفضلة (⭐ 5)', 
    addTitle: 'إضافة مقطع جديد', 
    editTitle: 'تعديل المقطع', 
    cancel: 'إلغاء', 
    labelTitle: 'العنوان', 
    labelArtist: 'الفنان', 
    labelAlbum: 'الألبوم', 
    labelGenre: 'النوع الموسيقي', 
    labelRating: 'التقييم (1 - 5 ⭐)', 
    labelCover: 'معاينة غلاف الألبوم', 
    labelSpotify: 'رابط سبوتيفاي', 
    labelNotes: 'ملاحظات شخصية (اختياري)', 
    placeholderNotes: 'لماذا تحب هذه الأغنية؟', 
    btnSave: 'حفظ في الأرشيف', 
    btnUpdate: 'تحديث المقطع', 
    searchPlaceholder: 'ابحث عن الفنان، العنوان...', 
    autoSelectTag: '✨ اختيار الأغنية تلقائياً', 
    coverFilled: '✨ تم ملء الغلاف تلقائياً', 
    noCover: 'لا يوجد غلاف بعد', 
    coverSub: 'ابحث عن عنوان الأغنية أو الفنان أعلاه لملء الغلاف', 
    deleteHeader: 'حذف هذا المقطع؟', 
    deleteSub: 'سيتم إزالة المقطع نهائياً.', 
    btnDeleteConfirm: 'نعم، احذف', 
    noTracks: 'لم يتم العثور على مقاطع.', 
    loading: 'جاري التحميل...' 
  },
  KR: { 
    welcomeTitle: 'Cipdify에 오신 것을 환영합니다',
    welcomeSub: '좋아하는 노래, 추억, 개인 사운드 sanctuary를 여기에 아카이브하세요.',
    subtitle: '당신만의 개인 사운드 sanctuary', 
    totalArchive: '총 트랙 아카이브', 
    topFavorites: '최고 즐겨찾기 (⭐ 5)', 
    addTitle: '새 트랙 추가', 
    editTitle: '트랙 수정', 
    cancel: '취소', 
    labelTitle: '제목', 
    labelArtist: '아티스트', 
    labelAlbum: '앨범', 
    labelGenre: '장르', 
    labelRating: '평점 (1 - 5 ⭐)', 
    labelCover: '앨범 커버 미리보기', 
    labelSpotify: '스포티파이 링크', 
    labelNotes: '개인 메모 (선택사항)', 
    placeholderNotes: '이 노래를 좋아하는 이유는 무엇인가요?', 
    btnSave: '아카이브에 저장', 
    btnUpdate: '트랙 업데이트', 
    searchPlaceholder: '아티스트, 제목, 장르 검색...', 
    autoSelectTag: '✨ 자동 노래 선택', 
    coverFilled: '✨ 커버 자동 입력됨', 
    noCover: '커버 없음', 
    coverSub: '상단에서 노래 제목이나 아티스트를 검색하여 커버 자동 채우기', 
    deleteHeader: '이 트랙을 삭제하시겠습니까?', 
    deleteSub: '트랙이 영구적으로 삭제됩니다.', 
    btnDeleteConfirm: '예, 삭제합니다', 
    noTracks: '트랙을 찾을 수 없습니다.', 
    loading: '로딩 중...' 
  },
  JP: { 
    welcomeTitle: 'Cipdifyへようこそ',
    welcomeSub: 'お気に入りの曲や思い出、パーソナル・サウンド・サンクチュアリをここにアーカイブ。',
    subtitle: 'あなたのパーソナル・サウンド・サンクチュアリ', 
    totalArchive: '総トラック・アーカイブ', 
    topFavorites: 'お気に入り (⭐ 5)', 
    addTitle: '新規トラック追加', 
    editTitle: 'トラック編集', 
    cancel: 'キャンセル', 
    labelTitle: 'タイトル', 
    labelArtist: 'アーティスト', 
    labelAlbum: 'アルバム', 
    labelGenre: 'ジャンル', 
    labelRating: '評価 (1 - 5 ⭐)', 
    labelCover: 'アルバムカバープレビュー', 
    labelSpotify: 'Spotifyリンク', 
    labelNotes: 'メモ (任意)', 
    placeholderNotes: 'この曲が好きな理由は何ですか？', 
    btnSave: 'アーカイブに保存', 
    btnUpdate: 'トラックを更新', 
    searchPlaceholder: 'アーティスト、タイトルを検索...', 
    autoSelectTag: '✨ 自動楽曲選択', 
    coverFilled: '✨ カバー自動入力済み', 
    noCover: 'カバーなし', 
    coverSub: '曲名やアーティスト名を検索してカバーを自動入力', 
    deleteHeader: 'このトラックを削除しますか？', 
    deleteSub: 'トラックは永久に削除されます。', 
    btnDeleteConfirm: 'はい、削除します', 
    noTracks: 'トラックが見つかりません。', 
    loading: '読み込み中...' 
  },
  ES: { 
    welcomeTitle: 'Bienvenido a Cipdify',
    welcomeSub: 'Archiva tus canciones favoritas, recuerdos y tu santuario de sonido personal.',
    subtitle: 'Tu santuario de sonido personal', 
    totalArchive: 'Archivo Total de Pistas', 
    topFavorites: 'Favoritos (⭐ 5)', 
    addTitle: 'Añadir Nueva Pista', 
    editTitle: 'Editar Pista', 
    cancel: 'Cancelar', 
    labelTitle: 'Título', 
    labelArtist: 'Artista', 
    labelAlbum: 'Álbum', 
    labelGenre: 'Género', 
    labelRating: 'Valoración (1 - 5 ⭐)', 
    labelCover: 'Vista Previa de Portada', 
    labelSpotify: 'Enlace de Spotify', 
    labelNotes: 'Notas Personales (Opcional)', 
    placeholderNotes: '¿Por qué te gusta esta canción?', 
    btnSave: 'Guardar en Archivo', 
    btnUpdate: 'Actualizar Pista', 
    searchPlaceholder: 'Buscar artista, título...', 
    autoSelectTag: '✨ Selección Automática', 
    coverFilled: '✨ Portada completada', 
    noCover: 'Sin portada aún', 
    coverSub: 'Busca el título o artista arriba para auto-completar', 
    deleteHeader: '¿Eliminar esta pista?', 
    deleteSub: 'La pista se eliminará permanentemente.', 
    btnDeleteConfirm: 'Sí, Eliminar', 
    noTracks: 'No se encontraron pistas.', 
    loading: 'Cargando...' 
  },
  FR: { 
    welcomeTitle: 'Bienvenue sur Cipdify',
    welcomeSub: 'Archivez vos chansons préférées et votre sanctuaire sonore personnel.',
    subtitle: 'Votre sanctuaire sonore personnel', 
    totalArchive: 'Archives Totales', 
    topFavorites: 'Favoris (⭐ 5)', 
    addTitle: 'Ajouter une Piste', 
    editTitle: 'Modifier la Piste', 
    cancel: 'Annuler', 
    labelTitle: 'Titre', 
    labelArtist: 'Artiste', 
    labelAlbum: 'Album', 
    labelGenre: 'Genre', 
    labelRating: 'Note (1 - 5 ⭐)', 
    labelCover: 'Aperçu de la Pochette', 
    labelSpotify: 'Lien Spotify', 
    labelNotes: 'Notes Personnelles (Optionnel)', 
    placeholderNotes: 'Pourquoi aimez-vous cette chanson ?', 
    btnSave: 'Enregistrer dans l\'Archive', 
    btnUpdate: 'Mettre à Jour', 
    searchPlaceholder: 'Rechercher artiste, titre...', 
    autoSelectTag: '✨ Sélection Automatique', 
    coverFilled: '✨ Pochette remplie', 
    noCover: 'Pas encore de pochette', 
    coverSub: 'Recherchez le titre ou l\'artiste pour remplir la pochette', 
    deleteHeader: 'Supprimer cette piste ?', 
    deleteSub: 'La piste sera supprimée définitivement.', 
    btnDeleteConfirm: 'Oui, Supprimer', 
    noTracks: 'Aucune piste trouvée.', 
    loading: 'Chargement...' 
  },
  PT: { 
    welcomeTitle: 'Bem-vindo ao Cipdify',
    welcomeSub: 'Arquive suas músicas favoritas, memórias e seu santuário de som pessoal.',
    subtitle: 'O seu santuário de som pessoal', 
    totalArchive: 'Arquivo Total de Faixas', 
    topFavorites: 'Favoritos (⭐ 5)', 
    addTitle: 'Adicionar Nova Faixa', 
    editTitle: 'Editar Faixa', 
    cancel: 'Cancelar', 
    labelTitle: 'Título', 
    labelArtist: 'Artista', 
    labelAlbum: 'Álbum', 
    labelGenre: 'Gênero', 
    labelRating: 'Avaliação (1 - 5 ⭐)', 
    labelCover: 'Prévia da Capa do Álbum', 
    labelSpotify: 'Link do Spotify', 
    labelNotes: 'Notas Pessoais (Opcional)', 
    placeholderNotes: 'Por que você ama esta música?', 
    btnSave: 'Salvar no Arquivo', 
    btnUpdate: 'Atualizar Faixa', 
    searchPlaceholder: 'Pesquisar artista, título...', 
    autoSelectTag: '✨ Seleção Automática', 
    coverFilled: '✨ Capa preenchida', 
    noCover: 'Sem capa ainda', 
    coverSub: 'Pesquise o título acima para preencher', 
    deleteHeader: 'Excluir esta faixa?', 
    deleteSub: 'A faixa será permanentemente removida.', 
    btnDeleteConfirm: 'Sim, Excluir', 
    noTracks: 'Nenhuma faixa encontrada.', 
    loading: 'Carregando...' 
  },
  RU: { 
    welcomeTitle: 'Добро пожаловать в Cipdify',
    welcomeSub: 'Добавляйте свои любимые песни и личные музыкальные архивы.',
    subtitle: 'Ваше личное звуковое убежище', 
    totalArchive: 'Всего треков в архиве', 
    topFavorites: 'Избранное (⭐ 5)', 
    addTitle: 'Добавить трек', 
    editTitle: 'Редактировать трек', 
    cancel: 'Отмена', 
    labelTitle: 'Название', 
    labelArtist: 'Исполнитель', 
    labelAlbum: 'Альбом', 
    labelGenre: 'Жанр', 
    labelRating: 'Рейтинг (1 - 5 ⭐)', 
    labelCover: 'Превью обложки', 
    labelSpotify: 'Ссылка на Spotify', 
    labelNotes: 'Личные заметки (Необязательно)', 
    placeholderNotes: 'Почему вам нравится эта песня?', 
    btnSave: 'Сохранить в архив', 
    btnUpdate: 'Обновить трек', 
    searchPlaceholder: 'Поиск по исполнителю...', 
    autoSelectTag: '✨ Автовыбор трека', 
    coverFilled: '✨ Обложка добавлена', 
    noCover: 'Нет обложки', 
    coverSub: 'Введите название песни или исполнителя для автозаполнения', 
    deleteHeader: 'Удалить этот трек?', 
    deleteSub: 'Трек будет навсегда удален.', 
    btnDeleteConfirm: 'Да, удалить', 
    noTracks: 'Треки не найдены.', 
    loading: 'Загрузка...' 
  },
  DE: { 
    welcomeTitle: 'Willkommen bei Cipdify',
    welcomeSub: 'Archiviere deine Lieblingssongs und deinen persönlichen Klang-Zufluchtsort.',
    subtitle: 'Dein persönlicher Klang-Zufluchtsort', 
    totalArchive: 'Gesamtarchiv', 
    topFavorites: 'Favoriten (⭐ 5)', 
    addTitle: 'Neuen Titel Hinzufügen', 
    editTitle: 'Titel Bearbeiten', 
    cancel: 'Abbrechen', 
    labelTitle: 'Titel', 
    labelArtist: 'Künstler', 
    labelAlbum: 'Album', 
    labelGenre: 'Genre', 
    labelRating: 'Bewertung (1 - 5 ⭐)', 
    labelCover: 'Albumcover-Vorschau', 
    labelSpotify: 'Spotify-Link', 
    labelNotes: 'Persönliche Notizen (Optional)', 
    placeholderNotes: 'Warum liebst du diesen Song?', 
    btnSave: 'Im Archiv Speichern', 
    btnUpdate: 'Titel Aktualisieren', 
    searchPlaceholder: 'Künstler, Titel suchen...', 
    autoSelectTag: '✨ Auto-Auswahl', 
    coverFilled: '✨ Cover eingefügt', 
    noCover: 'Noch kein Cover', 
    coverSub: 'Titel oder Künstler suchen, um Cover einzufügen', 
    deleteHeader: 'Titel löschen?', 
    deleteSub: 'Der Titel wird dauerhaft gelöscht.', 
    btnDeleteConfirm: 'Ja, Löschen', 
    noTracks: 'Keine Titel gefunden.', 
    loading: 'Wird geladen...' 
  },
  CN: { 
    welcomeTitle: '欢迎来到 Cipdify',
    welcomeSub: '在此归档你喜爱的歌曲、回忆与专属声音庇护所。',
    subtitle: '你的专属声音庇护所', 
    totalArchive: '档案歌曲总数', 
    topFavorites: '5星最爱 (⭐ 5)', 
    addTitle: '添加新歌曲', 
    editTitle: '编辑歌曲', 
    cancel: '取消', 
    labelTitle: '歌名', 
    labelArtist: '歌手', 
    labelAlbum: '专辑', 
    labelGenre: '流派', 
    labelRating: '评分 (1 - 5 ⭐)', 
    labelCover: '专辑封面预览', 
    labelSpotify: 'Spotify 链接', 
    labelNotes: '个人笔记 (可选)', 
    placeholderNotes: '你为什么喜欢这首歌？', 
    btnSave: '保存到档案', 
    btnUpdate: '更新歌曲', 
    searchPlaceholder: '搜索歌手、歌名...', 
    autoSelectTag: '✨ 自动选择歌曲', 
    coverFilled: '✨ 封面已自动填充', 
    noCover: '暂无封面', 
    coverSub: '在上方搜索歌名或歌手以自动填充封面', 
    deleteHeader: '删除这首歌曲？', 
    deleteSub: '该歌曲将从档案中永久删除。', 
    btnDeleteConfirm: '确定删除', 
    noTracks: '未找到歌曲。', 
    loading: '加载中...' 
  }
};

const LANGUAGES_LIST = [
  { code: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'IT', flag: '🇮🇹', name: 'Italiano' },
  { code: 'NL', flag: '🇳🇱', name: 'Nederlands' },
  { code: 'AR', flag: '🇸🇦', name: 'العربية' },
  { code: 'KR', flag: '🇰🇷', name: '한국어' },
  { code: 'JP', flag: '🇯🇵', name: '日本語' },
  { code: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'PT', flag: '🇧🇷', name: 'Português' },
  { code: 'RU', flag: '🇷🇺', name: 'Русский' },
  { code: 'CN', flag: '🇨🇳', name: '中文 (简体)' }
];

const DEFAULT_GENRES = ['Pop', 'Rock', 'Indie', 'R&B', 'Jazz', 'Hip-Hop', 'Dance', 'K-Pop', 'Acoustic'];

export default function Cipdify() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [editingTrack, setEditingTrack] = useState(null);
  const [deleteTrackId, setDeleteTrackId] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState('ID');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS['EN'];

  const [songResults, setSongResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [isCustomGenre, setIsCustomGenre] = useState(false);

  const [form, setForm] = useState({
    title: '',
    artist: '',
    album: '',
    genre: 'Pop',
    rating: 5,
    notes: '',
    cover_url: '',
    spotify_link: ''
  });

  const fetchTracks = async () => {
    try {
      const res = await fetch('/api/tracks');
      const data = await res.json();
      if (Array.isArray(data)) setTracks(data);
    } catch (err) {
      console.error('Failed fetching tracks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const resetForm = () => {
    setForm({
      title: '',
      artist: '',
      album: '',
      genre: 'Pop',
      rating: 5,
      notes: '',
      cover_url: '',
      spotify_link: ''
    });
    setSongResults([]);
    setArtistResults([]);
    setIsCustomGenre(false);
    setEditingTrack(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLiveSearchSongs = async (query) => {
    setForm(prev => ({ ...prev, title: query }));

    if (query.trim().length < 2) {
      setSongResults([]);
      return;
    }

    try {
      const [resIndo, resGlobal] = await Promise.all([
        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&country=ID&limit=15`),
        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=15`)
      ]);

      const dataIndo = await resIndo.json();
      const dataGlobal = await resGlobal.json();

      let combinedResults = [
        ...(dataIndo.results || []),
        ...(dataGlobal.results || [])
      ];

      if (combinedResults.length === 0) {
        const resFallback = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=20`);
        const dataFallback = await resFallback.json();
        combinedResults = dataFallback.results || [];
      }

      const uniqueResults = Array.from(
        new Map(combinedResults.map(song => [song.trackId, song])).values()
      );

      setSongResults(uniqueResults.slice(0, 15));
    } catch (err) {
      console.error('Gagal mencari lagu:', err);
    }
  };

  const handleLiveSearchArtist = async (query) => {
    setForm(prev => ({ ...prev, artist: query }));

    if (query.trim().length < 2) {
      setArtistResults([]);
      return;
    }

    try {
      const [resIndo, resGlobal] = await Promise.all([
        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&attribute=artistTerm&country=ID&limit=15`),
        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&attribute=artistTerm&limit=15`)
      ]);

      const dataIndo = await resIndo.json();
      const dataGlobal = await resGlobal.json();

      let combinedResults = [
        ...(dataIndo.results || []),
        ...(dataGlobal.results || [])
      ];

      if (combinedResults.length === 0) {
        const resFallback = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=15`);
        const dataFallback = await resFallback.json();
        combinedResults = dataFallback.results || [];
      }

      const uniqueResults = Array.from(
        new Map(combinedResults.map(song => [song.trackId, song])).values()
      );

      setArtistResults(uniqueResults.slice(0, 15));
    } catch (err) {
      console.error('Gagal mencari artis:', err);
    }
  };

  const handleSelectSongItem = (song) => {
    const highResCover = song.artworkUrl100 ? song.artworkUrl100.replace('100x100bb', '600x600bb') : '';
    const songGenre = song.primaryGenreName || 'Pop';

    const isDefault = DEFAULT_GENRES.includes(songGenre);
    setIsCustomGenre(!isDefault);

    setForm(prev => ({
      ...prev,
      title: song.trackName || '',
      artist: song.artistName || '',
      album: song.collectionName || 'Single',
      genre: songGenre,
      cover_url: highResCover,
      spotify_link: song.trackViewUrl || ''
    }));

    setSongResults([]);
    setArtistResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.artist) return alert('Judul dan Artis wajib diisi!');

    try {
      const isEdit = !!editingTrack;
      const res = await fetch('/api/tracks', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEdit ? { ...form, id: editingTrack.id } : form)
      });

      if (res.ok) {
        resetForm();
        fetchTracks();
      }
    } catch (err) {
      console.error('Failed saving track:', err);
    }
  };

  const handleEdit = (track) => {
    setEditingTrack(track);
    const trackGenre = track.genre || 'Pop';
    const isDefault = DEFAULT_GENRES.includes(trackGenre);
    setIsCustomGenre(!isDefault);

    setForm({
      title: track.title,
      artist: track.artist,
      album: track.album || '',
      genre: trackGenre,
      rating: track.rating || 5,
      notes: track.notes || '',
      cover_url: track.cover_url || '',
      spotify_link: track.spotify_link || ''
    });
  };

  const confirmDelete = async () => {
    if (!deleteTrackId) return;
    try {
      const res = await fetch(`/api/tracks?id=${deleteTrackId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTracks();
        setDeleteTrackId(null);
      }
    } catch (err) {
      console.error('Failed deleting track:', err);
    }
  };

  const getSpotifyEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const match = url.match(/track\/([a-zA-Z0-9]+)/);
      if (match && match[1]) {
        return `https://open.spotify.com/embed/track/${match[1]}?utm_source=generator&theme=0`;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const filterGenres = ['All', ...DEFAULT_GENRES];
  
  const filteredTracks = tracks.filter(t => {
    const matchesSearch = 
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.artist.toLowerCase().includes(search.toLowerCase()) ||
      t.genre.toLowerCase().includes(search.toLowerCase());
    
    const matchesGenre = selectedGenre === 'All' || t.genre.toLowerCase() === selectedGenre.toLowerCase();

    return matchesSearch && matchesGenre;
  });

  const totalTracks = tracks.length;
  const topRatedTracks = tracks.filter(t => t.rating === 5).length;

  return (
    <div className={`min-h-screen pb-16 transition-colors duration-300 font-sans ${
      isDarkMode ? 'bg-[#1A1218] text-[#F8C3D9]' : 'bg-[#FFF0F5] text-[#D93678]'
    }`}>
      
      <header className={`sticky top-0 z-10 border-b py-4 px-6 md:px-12 flex justify-between items-center shadow-xs transition-colors duration-300 ${
        isDarkMode ? 'bg-[#1A1218] border-[#3D2838]' : 'bg-white/80 border-[#F8C3D9] backdrop-blur-md'
      }`}>
        <div className="flex items-center gap-2">
          <Disc className="w-7 h-7 animate-spin-slow text-[#D93678]" />
          <h1 className="text-2xl font-black tracking-wide text-[#D93678]">
            Cipdify<span className="text-[#8F2856]">.</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <p className="hidden md:flex text-xs md:text-sm font-semibold italic items-center gap-1.5 opacity-90 mr-2 text-[#D93678]">
            <Sparkles className="w-4 h-4 text-[#D93678]" />
            {t.subtitle}
          </p>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 shadow-xs ${
                isDarkMode 
                  ? 'bg-[#281C25] text-[#F8C3D9] border-[#3D2838] hover:bg-[#32232E]' 
                  : 'bg-white text-[#D93678] border-[#F8C3D9] hover:bg-[#FFF0F5]'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-[#D93678]" />
              <span>{LANGUAGES_LIST.find(l => l.code === lang)?.flag} {lang}</span>
            </button>

            {isLangOpen && (
              <div className={`absolute right-0 mt-2 w-44 max-h-56 overflow-y-auto rounded-2xl border shadow-2xl z-50 p-1.5 space-y-0.5 ${
                isDarkMode ? 'bg-[#281C25] border-[#3D2838]' : 'bg-white border-[#F8C3D9]'
              }`}>
                {LANGUAGES_LIST.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 text-xs font-bold rounded-xl transition flex items-center justify-between ${
                      lang === item.code
                        ? isDarkMode ? 'bg-[#D93678] text-white' : 'bg-[#F8C3D9] text-[#D93678]'
                        : isDarkMode ? 'hover:bg-[#32232E] text-[#F8C3D9]' : 'hover:bg-[#FFF0F5] text-[#D93678]'
                    }`}
                  >
                    <span>{item.flag} {item.code}</span>
                    <span className="text-[10px] opacity-70 font-normal truncate max-w-[80px] text-right">{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 shadow-xs ${
              isDarkMode 
                ? 'bg-[#281C25] text-amber-300 border-[#3D2838] hover:bg-[#32232E]' 
                : 'bg-white text-[#D93678] border-[#F8C3D9] hover:bg-[#FFF0F5]'
            }`}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-[#D93678]" />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-6 space-y-6">
        
        <div className={`p-6 rounded-3xl border transition duration-300 ${
          isDarkMode ? 'bg-[#281C25] border-[#3D2838]' : 'bg-white border-[#F8C3D9] shadow-sm shadow-pink-100/30'
        }`}>
          <h2 className={`text-xl md:text-2xl font-black ${isDarkMode ? 'text-white' : 'text-[#D93678]'}`}>
            {t.welcomeTitle}
          </h2>
          <p className={`text-xs md:text-sm mt-1 opacity-90 font-medium ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#8F2856]'}`}>
            {t.welcomeSub}
          </p>
        </div>

        <section className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-[#D93678] bg-[#D93678] shadow-xs flex items-center justify-between transition">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-pink-100">{t.totalArchive}</p>
              <p className="text-3xl font-black mt-1 text-white">{totalTracks}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#D93678]">
              <Music className="w-7 h-7" />
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-[#E4D5FF] bg-[#E4D5FF] shadow-xs flex items-center justify-between transition">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4A148C]">{t.topFavorites}</p>
              <p className="text-3xl font-black mt-1 text-[#311B92]">{topRatedTracks}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white text-[#7E57C2]">
              <Star className="w-7 h-7 fill-[#7E57C2] text-[#7E57C2]" />
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          
          <div className={`w-full lg:w-[38%] p-6 rounded-3xl border shadow-sm shrink-0 transition ${
            isDarkMode ? 'bg-[#281C25] border-[#3D2838]' : 'bg-white border-[#F8C3D9] shadow-pink-100/30'
          }`}>
            <div className="flex justify-between items-center mb-5">
              <h2 className={`text-lg font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#D93678]'}`}>
                {editingTrack ? <Edit3 className="w-5 h-5 text-[#D93678]" /> : <PlusCircle className="w-5 h-5 text-[#D93678]" />}
                {editingTrack ? t.editTitle : t.addTitle}
              </h2>
              {editingTrack && (
                <button 
                  onClick={resetForm}
                  className="text-xs text-[#D93678] font-bold hover:underline flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> {t.cancel}
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
              
              <div className="relative z-30">
                <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#D93678]'}`}>{t.labelTitle}</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={(e) => {
                    handleChange(e);
                    handleLiveSearchSongs(e.target.value);
                  }}
                  placeholder="e.g. Anti-Hero / Sial"
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition ${
                    isDarkMode 
                      ? 'bg-[#1A1218] border-[#3D2838] text-white focus:ring-[#D93678]' 
                      : 'bg-[#FFF0F5] border-[#F8C3D9] text-[#D93678] focus:ring-[#D93678] focus:bg-white'
                  }`}
                  required
                />

                {songResults.length > 0 && (
                  <div className={`absolute left-0 right-0 mt-1 border-2 rounded-2xl shadow-2xl z-40 max-h-60 overflow-y-auto p-2 space-y-1.5 ${
                    isDarkMode ? 'bg-[#281C25] border-[#3D2838]' : 'bg-white border-[#F8C3D9]'
                  }`}>
                    <div className={`px-2 py-1 text-[10px] font-extrabold uppercase rounded-lg ${
                      isDarkMode ? 'bg-[#D93678] text-white' : 'bg-[#F8C3D9] text-[#D93678]'
                    }`}>
                      {t.autoSelectTag}
                    </div>
                    {songResults.map((song, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectSongItem(song)}
                        className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition border border-transparent ${
                          isDarkMode 
                            ? 'hover:bg-[#32232E] hover:border-[#3D2838]' 
                            : 'hover:bg-[#FFF0F5] hover:border-[#F8C3D9]'
                        }`}
                      >
                        <img 
                          src={song.artworkUrl100 || ''} 
                          alt={song.trackName} 
                          className="w-10 h-10 rounded-lg object-cover shadow-xs" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-[#D93678]'}`}>{song.trackName}</p>
                          <p className={`text-[11px] opacity-80 truncate ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#8F2856]'}`}>{song.artistName} • <span className="italic">{song.collectionName}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative z-20">
                <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#D93678]'}`}>{t.labelArtist}</label>
                <input
                  type="text"
                  name="artist"
                  value={form.artist}
                  onChange={(e) => {
                    handleChange(e);
                    handleLiveSearchArtist(e.target.value);
                  }}
                  placeholder="e.g. Taylor Swift / Mahalini"
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition ${
                    isDarkMode 
                      ? 'bg-[#1A1218] border-[#3D2838] text-white focus:ring-[#D93678]' 
                      : 'bg-[#FFF0F5] border-[#F8C3D9] text-[#D93678] focus:ring-[#D93678] focus:bg-white'
                  }`}
                  required
                />

                {artistResults.length > 0 && (
                  <div className={`absolute left-0 right-0 mt-1 border-2 rounded-2xl shadow-2xl z-40 max-h-60 overflow-y-auto p-2 space-y-1.5 ${
                    isDarkMode ? 'bg-[#281C25] border-[#3D2838]' : 'bg-white border-[#F8C3D9]'
                  }`}>
                    <div className={`px-2 py-1 text-[10px] font-extrabold uppercase rounded-lg ${
                      isDarkMode ? 'bg-[#D93678] text-white' : 'bg-[#F8C3D9] text-[#D93678]'
                    }`}>
                      {t.autoSelectTag}
                    </div>
                    {artistResults.map((song, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectSongItem(song)}
                        className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition border border-transparent ${
                          isDarkMode 
                            ? 'hover:bg-[#32232E] hover:border-[#3D2838]' 
                            : 'hover:bg-[#FFF0F5] hover:border-[#F8C3D9]'
                        }`}
                      >
                        <img 
                          src={song.artworkUrl100 || ''} 
                          alt={song.trackName} 
                          className="w-10 h-10 rounded-lg object-cover shadow-xs" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-[#D93678]'}`}>{song.trackName}</p>
                          <p className={`text-[11px] opacity-80 truncate ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#8F2856]'}`}>{song.artistName} • <span className="italic">{song.collectionName}</span></p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#D93678]'}`}>{t.labelAlbum}</label>
                  <input
                    type="text"
                    name="album"
                    value={form.album}
                    onChange={handleChange}
                    placeholder="Album name"
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition ${
                      isDarkMode 
                        ? 'bg-[#1A1218] border-[#3D2838] text-white focus:ring-[#D93678]' 
                        : 'bg-[#FFF0F5] border-[#F8C3D9] text-[#D93678] focus:ring-[#D93678] focus:bg-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#D93678]'}`}>{t.labelGenre}</label>
                  <select
                    value={isCustomGenre ? 'Custom' : form.genre}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'Custom') {
                        setIsCustomGenre(true);
                        setForm(prev => ({ ...prev, genre: '' }));
                      } else {
                        setIsCustomGenre(false);
                        setForm(prev => ({ ...prev, genre: val }));
                      }
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition ${
                      isDarkMode 
                        ? 'bg-[#1A1218] border-[#3D2838] text-white focus:ring-[#D93678]' 
                        : 'bg-[#FFF0F5] border-[#F8C3D9] text-[#D93678] focus:ring-[#D93678] focus:bg-white'
                    }`}
                  >
                    {DEFAULT_GENRES.map((g) => (
                      <option key={g} value={g} className={isDarkMode ? 'bg-[#281C25]' : ''}>{g}</option>
                    ))}
                    <option value="Custom" className={isDarkMode ? 'bg-[#281C25]' : ''}>✏️ Custom / Other...</option>
                  </select>

                  {isCustomGenre && (
                    <input
                      type="text"
                      name="genre"
                      value={form.genre}
                      onChange={handleChange}
                      placeholder="Custom genre..."
                      className={`w-full px-3.5 py-2 mt-2 rounded-xl border focus:outline-none focus:ring-2 text-xs transition ${
                        isDarkMode 
                          ? 'bg-[#1A1218] border-[#3D2838] text-white focus:ring-[#D93678]' 
                          : 'bg-[#FFF0F5] border-[#F8C3D9] text-[#D93678] focus:ring-[#D93678] focus:bg-white'
                      }`}
                      autoFocus
                      required
                    />
                  )}
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#D93678]'}`}>{t.labelRating}</label>
                <select
                  name="rating"
                  value={form.rating}
                  onChange={handleChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition ${
                    isDarkMode 
                      ? 'bg-[#1A1218] border-[#3D2838] text-white focus:ring-[#D93678]' 
                      : 'bg-[#FFF0F5] border-[#F8C3D9] text-[#D93678] focus:ring-[#D93678] focus:bg-white'
                  }`}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r} className={isDarkMode ? 'bg-[#281C25]' : ''}>{r} Stars</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#D93678]'}`}>{t.labelCover}</label>
                <div className={`flex items-center gap-3 p-2.5 rounded-2xl border ${
                  isDarkMode ? 'bg-[#1A1218] border-[#3D2838]' : 'bg-[#FFF0F5]/50 border-[#F8C3D9]'
                }`}>
                  <div className={`w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center border ${
                    isDarkMode ? 'bg-[#281C25] border-[#3D2838]' : 'bg-white border-[#F8C3D9]'
                  }`}>
                    {form.cover_url ? (
                      <img src={form.cover_url} alt="Cover Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Music className="w-5 h-5 text-[#D93678]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate text-[#D93678]">
                      {form.cover_url ? t.coverFilled : t.noCover}
                    </p>
                    <p className={`text-[10px] opacity-80 truncate ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#8F2856]'}`}>
                      {form.cover_url ? form.cover_url : t.coverSub}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#D93678]'}`}>{t.labelSpotify}</label>
                <input
                  type="url"
                  name="spotify_link"
                  value={form.spotify_link}
                  onChange={handleChange}
                  placeholder="https://open.spotify.com/track/..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition ${
                    isDarkMode 
                      ? 'bg-[#1A1218] border-[#3D2838] text-white focus:ring-[#D93678]' 
                      : 'bg-[#FFF0F5] border-[#F8C3D9] text-[#D93678] focus:ring-[#D93678] focus:bg-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#D93678]'}`}>{t.labelNotes}</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows="2"
                  placeholder={t.placeholderNotes}
                  className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 transition ${
                    isDarkMode 
                      ? 'bg-[#1A1218] border-[#3D2838] text-white focus:ring-[#D93678]' 
                      : 'bg-[#FFF0F5] border-[#F8C3D9] text-[#D93678] focus:ring-[#D93678] focus:bg-white'
                  }`}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 font-black rounded-xl text-white bg-[#D93678] hover:bg-[#8F2856] transition-all duration-300 shadow-md shadow-pink-500/20 flex items-center justify-center gap-2"
              >
                {editingTrack ? <Edit3 className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                {editingTrack ? t.btnUpdate : t.btnSave}
              </button>
            </form>
          </div>

          <div className="w-full lg:w-[62%] space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#D93678]" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 w-full transition ${
                    isDarkMode 
                      ? 'bg-[#281C25] border-[#3D2838] text-white focus:ring-[#D93678]' 
                      : 'bg-white border-[#F8C3D9] text-[#D93678] focus:ring-[#D93678] shadow-xs'
                  }`}
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1 text-xs">
                {filterGenres.map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g)}
                    className={`px-3.5 py-1.5 rounded-full border transition whitespace-nowrap font-bold ${
                      selectedGenre === g
                        ? 'bg-[#D93678] text-white border-transparent shadow-xs'
                        : isDarkMode 
                          ? 'bg-[#281C25] text-[#F8C3D9] border-[#3D2838] hover:bg-[#32232E]' 
                          : 'bg-white text-[#D93678] border-[#F8C3D9] hover:bg-[#FFF0F5] hover:border-[#D93678]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <p className={`text-sm text-center py-10 opacity-80 ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#D93678]'}`}>{t.loading}</p>
            ) : filteredTracks.length === 0 ? (
              <div className={`p-8 rounded-3xl text-center text-sm border font-medium ${
                isDarkMode ? 'bg-[#281C25] border-[#3D2838] text-[#F8C3D9]' : 'bg-white border-[#F8C3D9] text-[#D93678]'
              }`}>
                {t.noTracks}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTracks.map((track) => {
                  const embedUrl = getSpotifyEmbedUrl(track.spotify_link);

                  return (
                    <div
                      key={track.id}
                      className={`p-4 rounded-3xl border shadow-xs transition duration-300 group relative flex flex-col md:flex-row gap-4 items-start ${
                        isDarkMode 
                          ? 'bg-[#281C25] border-[#3D2838] hover:border-[#D93678]' 
                          : 'bg-white border-[#F8C3D9] hover:border-[#D93678] hover:shadow-md hover:shadow-pink-100/40'
                      }`}
                    >
                      <div className={`w-20 h-20 rounded-2xl flex-shrink-0 overflow-hidden flex items-center justify-center border ${
                        isDarkMode ? 'bg-[#1A1218] border-[#3D2838]' : 'bg-[#FFF0F5] border-[#F8C3D9]'
                      }`}>
                        {track.cover_url ? (
                          <img src={track.cover_url} alt={track.title || 'Track Cover'} className="w-full h-full object-cover" />
                        ) : (
                          <Music className="w-8 h-8 text-[#D93678]" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1 w-full">
                        <div className="flex justify-between items-start pr-16">
                          <h3 className={`font-bold text-base truncate ${isDarkMode ? 'text-white' : 'text-[#D93678]'}`}>{track.title}</h3>
                        </div>
                        <p className="text-xs font-bold text-[#D93678]">{track.artist}</p>
                        <p className={`text-[11px] opacity-80 italic ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#8F2856]'}`}>
                          {track.album !== '-' ? track.album : 'Single'} • <span className="font-bold opacity-100 text-[#D93678]">{track.genre}</span>
                        </p>

                        <div className="flex gap-0.5 pt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < track.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : isDarkMode ? 'text-[#3D2838]' : 'text-pink-100'
                              }`}
                            />
                          ))}
                        </div>

                        {track.notes && (
                          <p className={`text-xs p-3 rounded-2xl border mt-2 ${
                            isDarkMode ? 'bg-[#1A1218] border-[#3D2838] text-[#F8C3D9]' : 'bg-[#FFF0F5]/50 border-[#F8C3D9] text-[#D93678]'
                          }`}>
                            "{track.notes}"
                          </p>
                        )}

                        {embedUrl && (
                          <div className="pt-2">
                            <iframe
                              src={embedUrl}
                              width="100%"
                              height="80"
                              frameBorder="0"
                              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                              loading="lazy"
                              title={`Spotify player for ${track.title}`}
                              className="rounded-2xl overflow-hidden"
                            ></iframe>
                          </div>
                        )}
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition duration-200">
                        <button
                          onClick={() => handleEdit(track)}
                          className={`p-2 border rounded-xl transition ${
                            isDarkMode 
                              ? 'bg-[#32232E] border-[#3D2838] text-[#F8C3D9] hover:bg-[#D93678] hover:text-white' 
                              : 'bg-[#FFF0F5] border-[#F8C3D9] hover:bg-[#F8C3D9] text-[#D93678]'
                          }`}
                          title="Edit track"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTrackId(track.id)}
                          className={`p-2 border rounded-xl transition ${
                            isDarkMode ? 'bg-[#32232E] border-[#3D2838] text-[#F8C3D9] hover:bg-[#D93678] hover:text-white' : 'bg-[#FFF0F5] border-[#F8C3D9] hover:bg-[#F8C3D9] text-[#D93678]'
                          }`}
                          title="Delete track"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </main>

      {deleteTrackId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className={`border-2 rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-4 text-center ${
            isDarkMode ? 'bg-[#281C25] border-[#3D2838]' : 'bg-white border-[#F8C3D9]'
          }`}>
            <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
              isDarkMode ? 'bg-[#32232E] text-[#D93678]' : 'bg-[#F8C3D9] text-[#D93678]'
            }`}>
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-[#D93678]'}`}>{t.deleteHeader}</h3>
              <p className={`text-xs opacity-90 mt-1 ${isDarkMode ? 'text-[#F8C3D9]' : 'text-[#8F2856]'}`}>
                {t.deleteSub}
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteTrackId(null)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition duration-150 ${
                  isDarkMode ? 'bg-[#1A1218] border-[#3D2838] text-[#F8C3D9] hover:bg-[#32232E]' : 'bg-[#FFF0F5] border-[#F8C3D9] text-[#D93678] hover:bg-[#F8C3D9]'
                }`}
              >
                {t.cancel}
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-[#D93678] hover:bg-[#8F2856] text-white text-xs font-black shadow-xs transition duration-150"
              >
                {t.btnDeleteConfirm}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
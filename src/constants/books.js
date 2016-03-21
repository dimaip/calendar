const books = [
  {
    key: 'Genesis',
    fullName: 'Бытие',
    shortName: 'Быт. Быт Бт. Бт Бытие Ge. Ge Gen. Gen Gn. Gn Genesis',
    chapterQty: '50'
  },
  {
    key: 'Exodus',
    fullName: 'Исход',
    shortName: 'Исх. Исх Исход Ex. Ex Exo. Exo Exod. Exod Exodus',
    chapterQty: '40'
  },
  {
    key: 'Leviticus',
    fullName: 'Левит',
    shortName: 'Лев. Лев Лв. Лв Левит Lev. Lev Le. Le Lv. Lv Levit. Levit Leviticus',
    chapterQty: '27'
  },
  {
    key: 'Numbers',
    fullName: 'Числа',
    shortName: 'Чис. Чис Чс. Чс Числ. Числ Числа Nu. Nu Num. Num Nm. Nm Numb. Numb Numbers',
    chapterQty: '36'
  },
  {
    key: 'Deuteronomy',
    fullName: 'Второзаконие',
    shortName: 'Втор. Втор Вт. Вт Втрзк. Втрзк Второзаконие De. De Deut. Deut Deu. Deu Dt. Dt  Deuteron. Deuteron Deuteronomy',
    chapterQty: '34'
  },
  {
    key: 'Joshua',
    fullName: 'Иисус Навин',
    shortName: 'Иис.Нав. Иис.Нав Нав. Нав Иисус Навин Jos. Jos Josh. Josh Joshua',
    chapterQty: '24'
  },
  {
    key: 'Judges',
    fullName: 'Судьи',
    shortName: 'Суд. Суд Сд. Сд Судьи Jdg. Jdg Judg. Judg Judge. Judge Judges',
    chapterQty: '21'
  },
  {
    key: 'Rt',
    fullName: 'Руфь',
    shortName: 'Руф. Руф Рф. Рф Руфь Ru. Ru Ruth Rth. Rth Rt. Rt',
    chapterQty: '4'
  },
  {
    key: '1Samuel',
    fullName: '1-я Царств',
    shortName: '1Цар. 1Цар 1Цр. 1Цр 1Ц 1Царств. 1Царств 1Sa. 1Sa 1S. 1S 1Sam. 1Sam 1Sm. 1Sm 1Sml. 1Sml 1Samuel',
    chapterQty: '31'
  },
  {
    key: '2Samuel',
    fullName: '2-я Царств',
    shortName: '2Цар. 2Цар 2Цр. 2Цр 2Ц 2Царств. 2Царств 2Sa. 2Sa 2S. 2S 2Sam. 2Sam 2Sm. 2Sm 2Sml. 2Sml 2Samuel',
    chapterQty: '24'
  },
  {
    key: '1Kings',
    fullName: '3-я Царств',
    shortName: '3Цар. 3Цар 3Цр. 3Цр 3Ц 3Царств. 3Царств 1Ki. 1Ki 1K. 1K 1Kn. 1Kn 1Kg. 1Kg 1King. 1King 1Kng. 1Kng 1Kings',
    chapterQty: '22'
  },
  {
    key: '2Kings',
    fullName: '4-я Царств',
    shortName: '4Цар. 4Цар 4Цр. 4Цр 4Ц 4Царств. 4Царств 2Ki. 2Ki 2K. 2K 2Kn. 2Kn 2Kg. 2Kg 2King. 2King 2Kng. 2Kng 2Kings',
    chapterQty: '25'
  },
  {
    key: '1Chron',
    fullName: '1-я Паралипоменон',
    shortName: '1Пар. 1Пар 1Пр. 1Пр 1Chr. 1Chr 1Ch. 1Ch 1Chron. 1Chron',
    chapterQty: '29'
  },
  {
    key: '2Chron',
    fullName: '2-я Паралипоменон',
    shortName: '2Пар. 2Пар 2Пр. 2Пр 2Chr. 2Chr 2Ch. 2Ch 2Chron. 2Chron',
    chapterQty: '36'
  },
  {
    key: 'Ezra',
    fullName: 'Ездра',
    shortName: 'Ездр. Ездр Езд. Езд Ез. Ез Ездра Ezr. Ezr Ezra',
    chapterQty: '10'
  },
  {
    key: 'Nehemiah',
    fullName: 'Неемия',
    shortName: 'Неем. Неем. Нм. Нм Неемия Ne. Ne Neh. Neh Nehem. Nehem Nehemiah',
    chapterQty: '13'
  },
  {
    key: 'Es.',
    fullName: 'Есфирь',
    shortName: 'Есф. Есф Ес. Ес Есфирь Esth. Esth Est. Est Esther Es Es.',
    chapterQty: '10'
  },
  {
    key: 'Jb',
    fullName: 'Иов',
    shortName: 'Иов. Иов Ив. Ив Job. Job Jb. Jb',
    chapterQty: '42'
  },
  {
    key: 'Psalms',
    fullName: 'Псалтирь',
    shortName: 'Пс. Пс Псалт. Псалт Псал. Псал Псл. Псл Псалом Псалтирь Псалмы Ps. Ps Psa. Psa Psal. Psal Psalm Psalms',
    chapterQty: '150'
  },
  {
    key: 'Proverbs',
    fullName: 'Притчи',
    shortName: 'Прит. Прит Притч. Притч Пр. Пр Притчи Притча Pr. Pr Prov. Prov Pro. Pro Proverb Proverbs',
    chapterQty: '31'
  },
  {
    key: 'Ecclesia',
    fullName: 'Екклесиаст',
    shortName: 'Еккл. Еккл Ек. Ек Екк. Екк Екклесиаст Ec. Ec Eccl. Eccl Ecc. Ecc Ecclesia. Ecclesia',
    chapterQty: '12'
  },
  {
    key: 'Sol',
    fullName: 'Песня Песней',
    shortName: 'Песн. Песн Пес. Пес Псн. Псн Песн.Песней Песни Song. Song Songs SS. SS Sol. Sol',
    chapterQty: '8'
  },
  {
    key: 'Isaiah',
    fullName: 'Исаия',
    shortName: 'Ис. Ис Иса. Иса Исаия Исайя Isa. Isa Is. Is Isaiah',
    chapterQty: '66'
  },
  {
    key: 'Jeremiah',
    fullName: 'Иеремия',
    shortName: 'Иер. Иер Иерем. Иерем Иеремия Je. Je Jer. Jer Jerem. Jerem Jeremiah',
    chapterQty: '52'
  },
  {
    key: 'Lamentations',
    fullName: 'Плач Иеремии',
    shortName: 'Плач. Плач Плч. Плч Пл. Пл Пл.Иер. Пл.Иер Плач Иеремии La. La Lam. Lam Lament. Lament Lamentation Lamentations',
    chapterQty: '5'
  },
  {
    key: 'Ezekiel',
    fullName: 'Иезекииль',
    shortName: 'Иез. Иез Из. Из Иезек. Иезек Иезекииль Ez. Ez Eze. Eze Ezek. Ezek Ezekiel',
    chapterQty: '48'
  },
  {
    key: 'Daniel',
    fullName: 'Даниил',
    shortName: 'Дан. Дан Дн. Дн Днл. Днл Даниил Da. Da Dan. Dan Daniel',
    chapterQty: '14'
  },
  {
    key: 'Hosea',
    fullName: 'Осия',
    shortName: 'Ос. Ос Осия Hos. Hos Ho. Ho Hosea',
    chapterQty: '14'
  },
  {
    key: 'Joe',
    fullName: 'Иоиль',
    shortName: 'Иоил. Иоил Ил. Ил Иоиль Joel. Joel Joe. Joe',
    chapterQty: '3'
  },
  {
    key: 'Amo',
    fullName: 'Амос',
    shortName: 'Ам. Ам Амс. Амс Амос Am. Am Amos Amo. Amo',
    chapterQty: '9'
  },
  {
    key: 'Oba',
    fullName: 'Авдий',
    shortName: 'Авд. Авд Авдий Ob. Ob Obad. Obad. Obadiah Oba. Oba',
    chapterQty: '1'
  },
  {
    key: 'Jonah',
    fullName: 'Иона',
    shortName: 'Ион. Ион. Иона Jon. Jon Jnh. Jnh. Jona. Jona Jonah',
    chapterQty: '4'
  },
  {
    key: 'Micah',
    fullName: 'Михей',
    shortName: 'Мих. Мих Мх. Мх Михей Mi. Mi Mic. Mic Micah',
    chapterQty: '7'
  },
  {
    key: 'Nahum',
    fullName: 'Наум',
    shortName: 'Наум. Наум Na. Na Nah. Nah Nahum',
    chapterQty: '3'
  },
  {
    key: 'Habakkuk',
    fullName: 'Аввакум',
    shortName: 'Авв. Авв Аввак. Аввак Аввакум Hab. Hab Habak. Habak Habakkuk',
    chapterQty: '3'
  },
  {
    key: 'Zephaniah',
    fullName: 'Софония',
    shortName: 'Соф. Соф Софон. Софон Софония Zeph. Zeph  Zep. Zep Zephaniah',
    chapterQty: '3'
  },
  {
    key: 'Haggai',
    fullName: 'Аггей',
    shortName: 'Агг. Агг Аггей Hag. Hag Haggai',
    chapterQty: '2'
  },
  {
    key: 'Zechariah',
    fullName: 'Захария',
    shortName: 'Зах. Зах Зхр. Зхр Захар. Захар Захария Ze. Ze Zec. Zec Zech. Zech Zechariah',
    chapterQty: '14'
  },
  {
    key: 'Malachi',
    fullName: 'Малахия',
    shortName: 'Мал. Мал Малах. Малах Млх. Млх Малахия Mal. Mal Malachi',
    chapterQty: '4'
  },
  {
    key: 'Matthew',
    fullName: 'От Матфея',
    shortName: 'Матф. Матф Мтф. Мтф Мф. Мф Мт. Мт Матфея Матфей Мат Мат. Mt. Mt Ma. Ma Matt. Matt Mat. Mat Matthew',
    chapterQty: '28'
  },
  {
    key: 'Mark',
    fullName: 'От Марка',
    shortName: 'Мар. Мар Марк. Марк Мрк. Мрк Мр. Мр Марка Мк Мк. Mk. Mk Mar. Mar Mr. Mr Mrk. Mrk Mark',
    chapterQty: '16'
  },
  {
    key: 'Luke',
    fullName: 'От Луки',
    shortName: 'Лук. Лук Лк. Лк Лукa Луки Lk. Lk Lu. Lu Luk. Luk Luke',
    chapterQty: '24'
  },
  {
    key: 'John',
    fullName: 'От Иоанна',
    shortName: 'Иоан. Иоан Ин. Ин Иоанн Иоанна Jn. Jn Jno. Jno Joh. Joh John',
    chapterQty: '21'
  },
  {
    key: 'Acts',
    fullName: 'Деяния',
    shortName: 'Деян. Деян Дея. Дея Д.А. Деяния Ac. Ac Act. Act Acts',
    chapterQty: '28'
  },
  {
    key: 'James',
    fullName: 'Иакова',
    shortName: 'Иак. Иак Ик. Ик Иаков Иакова Jas. Jas Ja. Ja Jam. Jam Jms. Jms James',
    chapterQty: '5'
  },
  {
    key: '1Peter',
    fullName: '1-е Петра',
    shortName: '1Пет. 1Пет 1Пт. 1Пт 1Птр. 1Птр 1Петр. 1Петр 1Петра 1Pe. 1Pe 1Pet. 1Pet 1Peter',
    chapterQty: '5'
  },
  {
    key: '2Peter',
    fullName: '2-е Петра',
    shortName: '2Пет. 2Пет 2Пт. 2Пт 2Птр. 2Птр 2Петр. 2Петр 2Петра 2Pe. 2Pe 2Pet. 2Pet 2Peter',
    chapterQty: '3'
  },
  {
    key: '1John',
    fullName: '1-е Иоанна',
    shortName: '1Иоан. 1Иоан 1Ин. 1Ин 1Иоанн 1Иоанна 1Jn. 1Jn 1Jo. 1Jo 1Joh. 1Joh 1Jno. 1Jno 1John',
    chapterQty: '5'
  },
  {
    key: '2John',
    fullName: '2-е Иоанна',
    shortName: '2Иоан. 2Иоан 2Ин. 2Ин 2Иоанн 2Иоанна 2Jn. 2Jn 2Jo. 2Jo 2Joh. 2Joh 2Jno. 2Jno 2John',
    chapterQty: '1'
  },
  {
    key: '3John',
    fullName: '3-е Иоанна',
    shortName: '3Иоан. 3Иоан 3Ин. 3Ин 3Иоанн 3Иоанна 3Jn. 3Jn 3Jo. 3Jo 3Joh. 3Joh 3Jno. 3Jno 3John',
    chapterQty: '1'
  },
  {
    key: 'Jd',
    fullName: 'Иуды',
    shortName: 'Иуд. Иуд Ид. Ид Иуда Иуды Jud. Jud Jude Jd. Jd',
    chapterQty: '1'
  },
  {
    key: 'Romans',
    fullName: 'К Римлянам',
    shortName: 'Рим. Рим Римл. Римл Римлянам Ro. Ro Rom. Rom Romans',
    chapterQty: '16'
  },
  {
    key: '1Corinthians',
    fullName: '1-е Коринфянам',
    shortName: '1Кор. 1Кор 1Коринф. 1Коринф 1Коринфянам 1Коринфянам 1Co. 1Co 1Cor. 1Cor 1Corinth. 1Corinth 1Corinthians',
    chapterQty: '16'
  },
  {
    key: '2Corinthians',
    fullName: '2-е Коринфянам',
    shortName: '2Кор. 2Кор 2Коринф. 2Коринф 2Коринфянам 2Коринфянам 2Co. 2Co 2Cor. 2Cor 2Corinth. 2Corinth 2Corinthians',
    chapterQty: '13'
  },
  {
    key: 'Galatians',
    fullName: 'К Галатам',
    shortName: 'Гал. Гал Галат. Галат Галатам Ga. Ga Gal. Gal Galat. Galat Galatians',
    chapterQty: '6'
  },
  {
    key: 'Ephesians',
    fullName: 'К Ефесянам',
    shortName: 'Еф. Еф Ефес. Ефес Ефесянам Eph. Eph Ep. Ep Ephes. Ephes Ephesians',
    chapterQty: '6'
  },
  {
    key: 'Philippians',
    fullName: 'К Филиппийцам',
    shortName: 'Фил. Фил Флп. Флп Филип. Филип Филиппийцам Php. Php Ph. Ph Phil. Phil Phi. Phi. Philip. Philip Philippians',
    chapterQty: '4'
  },
  {
    key: 'Colossians',
    fullName: 'К Колоссянам',
    shortName: 'Кол. Кол Колос. Колос Колоссянам Col. Col Colos. Colos Colossians',
    chapterQty: '4'
  },
  {
    key: '1Thessalonians',
    fullName: '1-е Фессалоникийцам',
    shortName: '1Фесс. 1Фесс 1Фес. 1Фес 1Фессалоникийцам 1Сол. 1Сол 1Солунянам 1Th. 1Th 1Thes. 1Thes 1Thess. 1Thess 1Thessalonians',
    chapterQty: '5'
  },
  {
    key: '2Thessalonians',
    fullName: '2-е Фессалоникийцам',
    shortName: '2Фесс. 2Фесс 2Фес. 2Фес 2Фессалоникийцам 2Сол. 2Сол 2Солунянам 2Th. 2Th 2Thes. 2Thes 2Thess. 2Thess 2Thessalonians',
    chapterQty: '3'
  },
  {
    key: '1Timothy',
    fullName: '1-е Тимофею',
    shortName: '1Тим. 1Тим  1Тимоф. 1Тимоф 1Тимофею 1Ti. 1Ti 1Tim. 1Tim 1Timothy',
    chapterQty: '6'
  },
  {
    key: '2Timothy',
    fullName: '2-е Тимофею',
    shortName: '2Тим. 2Тим 2Тимоф. 2Тимоф 2Тимофею 2Ti. 2Ti 2Tim. 2Tim 2Timothy',
    chapterQty: '4'
  },
  {
    key: 'Titus',
    fullName: 'К Титу',
    shortName: 'Тит. Тит Титу Tit. Tit Ti. Ti Titus',
    chapterQty: '3'
  },
  {
    key: 'Philemon',
    fullName: 'К Филимону',
    shortName: 'Флм. Флм Филимон. Филимон Филимону Phm. Phm Phile. Phile Phlm. Phlm Philemon',
    chapterQty: '1'
  },
  {
    key: 'Hebrews',
    fullName: 'К Евреям',
    shortName: 'Евр. Евр Евреям He. He Heb. Heb Hebr. Hebr Hebrews',
    chapterQty: '13'
  },
  {
    key: 'Revelation',
    fullName: 'Откровение',
    shortName: 'Откр. Откр Отк. Отк Откровен. Откровен Апок. Апок Откровение Апокалипсис Rev. Rev Re. Re Rv. Rv Revelation',
    chapterQty: '22'
  },
  {
    key: '1Maccabees',
    fullName: '(неканон.) 1-я Маккавейская',
    shortName: '1Макк. 1Макк. 1Маккав. 1Маккав 1Мак. 1Мак 1Маккавейская 1Maccabees',
    chapterQty: '16'
  },
  {
    key: '2Maccabees',
    fullName: '(неканон.) 2-я Маккавейская',
    shortName: '2Макк. 2Макк. 2Маккав. 2Маккав 2Мак. 2Мак 2Маккавейская 2Maccabees',
    chapterQty: '15'
  },
  {
    key: '3Maccabees',
    fullName: '(неканон.) 3-я Маккавейская',
    shortName: '3Макк. 3Макк. 3Маккав. 3Маккав 3Мак. 3Мак 3Маккавейская 3Maccabees',
    chapterQty: '7'
  },
  {
    key: 'Varuh',
    fullName: '(неканон.) Варух',
    shortName: 'Вар. Вар Варух Varuh',
    chapterQty: '5'
  },
  {
    key: '2Ezdra',
    fullName: '(неканон.) 2-я Ездры',
    shortName: '2Ездр. 2Ездр 2Езд. 2Езд 2Ездра 2Ездры 2Ез 2Ез. 2Ezdra',
    chapterQty: '9'
  },
  {
    key: '3Ezdra',
    fullName: '(неканон.) 3-я Ездры',
    shortName: '3Ездр. 3Ездр 3Езд. 3Езд 3Ездра 3Ездры 3Ез 3Ез. 3Ezdra',
    chapterQty: '16'
  },
  {
    key: 'Judith',
    fullName: '(неканон.) Иудифь',
    shortName: 'Иудиф. Иудиф Иудифь Judith',
    chapterQty: '16'
  },
  {
    key: 'JeremiaLetter',
    fullName: '(неканон.) Послание Иеремии',
    shortName: 'Посл.Иер. Посл.Иер Посл.Иерем. Посл.Иерем Посл.Иеремии JeremiaLetter',
    chapterQty: '1'
  },
  {
    key: 'Wisdom',
    fullName: '(неканон.) Премудрости Соломона',
    shortName: 'Прем.Сол. Премудр.Соломон. Премудр.Сол. Премудр. Премудр.Соломона Премудрость Премудрости Прем Wisdom',
    chapterQty: '19'
  },
  {
    key: 'Sirah',
    fullName: '(неканон.) Сирах',
    shortName: 'Сир. Сир Сирах Sirah',
    chapterQty: '51'
  },
  {
    key: 'Tobit',
    fullName: '(неканон.) Товит',
    shortName: 'Тов. Тов Товит Tobit',
    chapterQty: '14'
  }
];

export default books;

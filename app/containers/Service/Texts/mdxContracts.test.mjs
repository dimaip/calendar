import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const textsRoot = path.dirname(fileURLToPath(import.meta.url));

const walkFiles = (directory) =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        return entry.isDirectory() ? walkFiles(entryPath) : [entryPath];
    });

const sourceFiles = walkFiles(textsRoot).filter((file) => /\.(?:mdx|tsx?)$/.test(file));

const sourceTextByFile = new Map(sourceFiles.map((file) => [file, readFileSync(file, 'utf8')]));

const requireMdxSource = (source, languages, context) => {
    assert.equal(path.isAbsolute(source), false, `${context}: MDX source must be relative`);
    assert.equal(source.includes('..'), false, `${context}: MDX source must stay inside Texts`);

    const sourceDirectory = path.join(textsRoot, source);
    assert.equal(
        existsSync(sourceDirectory) && statSync(sourceDirectory).isDirectory(),
        true,
        `${context}: missing MDX source directory ${source}`
    );

    for (const language of languages) {
        assert.equal(
            existsSync(path.join(sourceDirectory, `${language}.mdx`)),
            true,
            `${context}: missing ${source}/${language}.mdx`
        );
    }
};

test('every literal MdxLoader source resolves to its default Russian MDX module', () => {
    let referenceCount = 0;

    for (const [file, sourceText] of sourceTextByFile) {
        const relativeFile = path.relative(textsRoot, file);
        const literalPatterns = [
            /<MdxLoader\b[\s\S]*?\bsrc="([^"]+)"/g,
            /<MdxLoader\b[\s\S]*?\bsrc=\{`([^`$]+)`\}/g,
        ];

        for (const pattern of literalPatterns) {
            for (const match of sourceText.matchAll(pattern)) {
                referenceCount += 1;
                requireMdxSource(match[1], ['ru'], relativeFile);
            }
        }
    }

    assert.equal(referenceCount >= 1500, true, `expected the full MDX graph, found only ${referenceCount} references`);
});

test('the dynamically loadable language corpus preserves complete Russian files and paired Church Slavonic files', () => {
    const languageFiles = sourceFiles.filter((file) => /(?:^|\/)(?:ru|csj)\.mdx$/.test(file));
    const russianFiles = languageFiles.filter((file) => path.basename(file) === 'ru.mdx');
    const churchSlavonicFiles = languageFiles.filter((file) => path.basename(file) === 'csj.mdx');

    assert.equal(russianFiles.length, 915);
    assert.equal(churchSlavonicFiles.length, 836);

    for (const churchSlavonicFile of churchSlavonicFiles) {
        assert.equal(
            existsSync(path.join(path.dirname(churchSlavonicFile), 'ru.mdx')),
            true,
            `${path.relative(textsRoot, churchSlavonicFile)} has no Russian fallback`
        );
    }
});

test('all finite dynamic MdxLoader templates resolve for every supported value and language', () => {
    const ranges = {
        days: Array.from({ length: 7 }, (_, index) => index),
        weekdays: Array.from({ length: 6 }, (_, index) => index + 1),
        tones: Array.from({ length: 8 }, (_, index) => index + 1),
        matinsGospels: Array.from({ length: 11 }, (_, index) => index + 1),
    };
    const bratPrayerIds = [
        'PravdaMir',
        'BratEdinstvo',
        'ChurchCountry',
        'MolitvaRodNarod',
        'Neplyuev',
        'Opotsky1',
        'Opotsky2',
        'Opotsky3',
    ];
    const dynamicSources = new Map([
        ['BratMolitvoslov/${prayerId}', bratPrayerIds.map((id) => [`BratMolitvoslov/${id}`, ['ru']])],
        [
            'Liturgies/Katekhumen/Aliluja/Sunday/Glas${glas}',
            ranges.tones.map((tone) => [`Liturgies/Katekhumen/Aliluja/Sunday/Glas${tone}`, ['ru', 'csj']]),
        ],
        [
            'Liturgies/Katekhumen/Aliluja/WeekDays/${dayOfWeek}',
            ranges.weekdays.map((day) => [`Liturgies/Katekhumen/Aliluja/WeekDays/${day}`, ['ru', 'csj']]),
        ],
        [
            'Liturgies/Katekhumen/Prokimens/Sunday/Glas${glas}',
            ranges.tones.map((tone) => [`Liturgies/Katekhumen/Prokimens/Sunday/Glas${tone}`, ['ru', 'csj']]),
        ],
        [
            'Liturgies/Katekhumen/Prokimens/WeekDays/${dayOfWeek}',
            ranges.weekdays.map((day) => [`Liturgies/Katekhumen/Prokimens/WeekDays/${day}`, ['ru', 'csj']]),
        ],
        [
            'Liturgies/Vernie/Prichasten/${dayOfWeek}',
            ranges.days.map((day) => [`Liturgies/Vernie/Prichasten/${day}`, ['ru', 'csj']]),
        ],
        ['Matins/Exapostilari/${matinsKey}', ranges.matinsGospels.map((key) => [`Matins/Exapostilari/${key}`, ['ru']])],
        [
            'Matins/Prokimens/Glas${glas}',
            ranges.tones.map((tone) => [`Matins/Prokimens/Glas${tone}`, ['ru', 'csj']]),
        ],
        [
            'Matins/Stepenny/Glas${glas}',
            ranges.tones.map((tone) => [`Matins/Stepenny/Glas${tone}`, ['ru', 'csj']]),
        ],
        [
            'Matins/StihiriNaHvalite/Glas${glas}',
            ranges.tones.map((tone) => [`Matins/StihiriNaHvalite/Glas${tone}`, ['ru', 'csj']]),
        ],
        [
            'Matins/StihiriNaHvalite/Gospel/${day?.matinsGospelKey}',
            ranges.matinsGospels.map((key) => [`Matins/StihiriNaHvalite/Gospel/${key}`, ['ru', 'csj']]),
        ],
        [
            'Shared/IpakoyiVoskr/Glas${glas}',
            ranges.tones.map((tone) => [`Shared/IpakoyiVoskr/Glas${tone}`, ['ru', 'csj']]),
        ],
        [
            'Shared/Kondacs/Day${dayOfWeek}',
            ranges.weekdays.map((day) => [`Shared/Kondacs/Day${day}`, ['ru', 'csj']]),
        ],
        [
            'Shared/Kondacs/Glas${glas}',
            ranges.tones.map((tone) => [`Shared/Kondacs/Glas${tone}`, ['ru', 'csj']]),
        ],
        [
            'Shared/Troparions/Day${dayOfWeek}',
            ranges.weekdays.map((day) => [`Shared/Troparions/Day${day}`, ['ru', 'csj']]),
        ],
        [
            'Shared/Troparions/Glas${glas}',
            ranges.tones.map((tone) => [`Shared/Troparions/Glas${tone}`, ['ru', 'csj']]),
        ],
        [
            'Vespers/Prokimens/Prokimen${dayOfWeek}',
            ranges.days.map((day) => [`Vespers/Prokimens/Prokimen${day}`, ['ru', 'csj']]),
        ],
        [
            'Vespers/StihiriNaGV/Glas${glas}',
            ranges.tones.map((tone) => [`Vespers/StihiriNaGV/Glas${tone}`, ['ru', 'csj']]),
        ],
        [
            'Vespers/StihiriNaStihah/Glas${glas}',
            ranges.tones.map((tone) => [`Vespers/StihiriNaStihah/Glas${tone}`, ['ru', 'csj']]),
        ],
    ]);

    const templatesInUse = new Set();
    for (const sourceText of sourceTextByFile.values()) {
        for (const match of sourceText.matchAll(/<MdxLoader\b[\s\S]*?\bsrc=\{`([^`]*\$\{[^`]+)`\}/g)) {
            templatesInUse.add(match[1]);
        }
    }

    assert.deepEqual([...templatesInUse].sort(), [...dynamicSources.keys()].sort());

    for (const [template, variants] of dynamicSources) {
        for (const [source, languages] of variants) {
            requireMdxSource(source, languages, template);
        }
    }
});

test('every direct MDX import resolves inside the content tree', () => {
    let importCount = 0;

    for (const [file, sourceText] of sourceTextByFile) {
        for (const match of sourceText.matchAll(/\bfrom\s+['"]([^'"]+\.mdx)['"]/g)) {
            importCount += 1;
            const specifier = match[1];
            const resolved = specifier.startsWith('containers/Service/Texts/')
                ? path.join(textsRoot, specifier.slice('containers/Service/Texts/'.length))
                : path.resolve(path.dirname(file), specifier);

            assert.equal(
                resolved.startsWith(`${textsRoot}${path.sep}`),
                true,
                `${path.relative(textsRoot, file)}: MDX import escapes Texts: ${specifier}`
            );
            assert.equal(
                existsSync(resolved) && statSync(resolved).isFile(),
                true,
                `${path.relative(textsRoot, file)}: unresolved MDX import ${specifier}`
            );
        }
    }

    assert.equal(importCount >= 65, true, `expected the full direct-import graph, found only ${importCount} imports`);
});

test('every statically declared service has the top-level module required by Service', () => {
    const servicesSource = readFileSync(path.join(textsRoot, 'Texts.tsx'), 'utf8');
    const staticServiceIds = [...servicesSource.matchAll(/\bid:\s*'([^']+)'/g)].map((match) => match[1]);
    const dynamicServiceIds = ['bratMolitvoslov', 'customPrayer'];
    const serviceIds = [...staticServiceIds, ...dynamicServiceIds];

    assert.equal(new Set(serviceIds).size, serviceIds.length, 'service IDs must be unique');

    for (const serviceId of serviceIds) {
        const directory = `${serviceId.charAt(0).toUpperCase()}${serviceId.slice(1)}`;
        assert.equal(
            existsSync(path.join(textsRoot, directory, 'index.dyn.tsx')),
            true,
            `${serviceId} is missing ${directory}/index.dyn.tsx`
        );
    }
});

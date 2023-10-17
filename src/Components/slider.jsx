import React, { useState, useEffect } from "react";

function Slider() {
    const imagens = [
        "https://img.freepik.com/fotos-premium/synthwave-wallpaper_398492-12146.jpg",
        "https://img.freepik.com/fotos-premium/plano-de-fundo-de-celebracao-do-festival-do-ano-novo-chines-china-cidade-casas-antigas-chinesas_625492-24263.jpg",
        "https://c4.wallpaperflare.com/wallpaper/295/163/719/anime-anime-boys-picture-in-picture-kimetsu-no-yaiba-kamado-tanjir%C5%8D-hd-wallpaper-preview.jpg",
        "https://files.passeidireto.com/e4384caa-4202-491e-99cf-821a33324c8c/e4384caa-4202-491e-99cf-821a33324c8c.jpeg"
    ];

    const [posicaoAtual, setPosicaoAtual] = useState(0);
    const [automacaoAtiva, setAutomacaoAtiva] = useState(true);

    const AvancarImagem = () => {
        setAutomacaoAtiva(false);
        setPosicaoAtual((s) => (s + 1) % imagens.length);
    };

    const VoltarImagem = () => {
        setAutomacaoAtiva(false);
        setPosicaoAtual((s) => (s - 1 + imagens.length) % imagens.length);
    };

    const iniciarAutomacao = () => {
        if (automacaoAtiva) {
            const novoIntervalo = setInterval(() => {
                AvancarImagem();
            }, 7000);
            return novoIntervalo;
        }
    };

    useEffect(() => {
        const intervalo = iniciarAutomacao();

        return () => {
            if (intervalo) {
                clearInterval(intervalo);
            }
        };
    }, [automacaoAtiva]);

    const handleClickQuadrado = (index) => {
        setAutomacaoAtiva(false);
        setPosicaoAtual(index);
    };

    const reativarAutomacao = () => {
        setAutomacaoAtiva(true);
    };

    let timeout;

    const handleMouseEnter = () => {
        clearTimeout(timeout);
    };

    const handleMouseLeave = () => {
        clearTimeout(timeout);
        timeout = setTimeout(reativarAutomacao, 5000); // 5 segundos de inatividade
    };

    useEffect(() => {
        timeout = setTimeout(reativarAutomacao, 5000); // Inicialmente, após 5 segundos de inatividade

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <main>
            <section
                className="slider"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <figure style={{ transform: `translateX(-${posicaoAtual * 100}%)` }}>
                    {imagens.map((imagem, index) => (
                        <img key={index} src={imagem} alt="" />
                    ))}
                </figure>
                <div className="setaEsquerda">
                    <button onClick={() => {
                        setAutomacaoAtiva(false);
                        VoltarImagem();
                    }}>⬅️</button>
                </div>
                <div className="setaDireita">
                    <button onClick={() => {
                        setAutomacaoAtiva(false);
                        AvancarImagem();
                    }}>➡️</button>
                </div>
                <section className="quadrados">
                    {imagens.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => handleClickQuadrado(index)}
                            style={{ backgroundColor: posicaoAtual === index ? "white" : "" }}
                        />
                    ))}
                </section>
            </section>
        </main>
    );
}

export default Slider;

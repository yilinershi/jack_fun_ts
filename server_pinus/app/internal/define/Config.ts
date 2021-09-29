import { E_GameName, E_GameType, E_MatchType } from "./Enum";




export default class GameConfig {
    public static GameInfo: Array<{ GameType: number, MatchType: E_MatchType, NameChinese: string }> = [
        { GameType: E_GameType.Brnn, MatchType: E_MatchType.Hundred, NameChinese: E_GameName.Brnn },
        { GameType: E_GameType.Bjl, MatchType: E_MatchType.Hundred, NameChinese: E_GameName.Bjl },
        { GameType: E_GameType.Ddz, MatchType: E_MatchType.Match, NameChinese: E_GameName.Ddz },
    ]
}
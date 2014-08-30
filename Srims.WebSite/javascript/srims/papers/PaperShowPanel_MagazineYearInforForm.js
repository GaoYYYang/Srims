
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel_MagazineYearInforForm = function(paper){
    this._paper = paper;
    this._magazineId = this._paper.get('magazineID');
    return new Srims.papers.MagazineShowPanel_YearInforForm(this._magazineId, true);
}
